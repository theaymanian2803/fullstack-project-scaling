import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from './../slices/orderApiSlice'

const StatusIndicator = ({ condition, trueText, falseText, date }) => (
  <div
    className={`flex items-center gap-4 px-6 py-4 rounded-none border-2 ${
      condition
        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
        : 'bg-orange-600/5 border-orange-600/20 text-orange-500'
    }`}>
    <div
      className={`w-3 h-3 rounded-full shadow-[0_0_12px_currentColor] ${
        condition ? 'bg-emerald-400' : 'bg-orange-500'
      }`}
    />
    <span className="text-sm font-black uppercase tracking-[0.3em]">
      {condition ? `${trueText} // ${date?.substring(0, 10)}` : falseText}
    </span>
  </div>
)

function DetailsOrder() {
  const { id: orderId } = useParams()
  const { userInfo } = useSelector((state) => state.auth)

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  const [deliverOrder, { isLoading: deliveryIsLoading }] = useDeliverOrderMutation()
  const [payOrder, { isLoading: paymentIsLoading }] = usePayOrderMutation()
  const {
    data: paypal,
    isLoading: paypalIsLoading,
    error: paypalError,
  } = useGetPayPalClientIdQuery()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  useEffect(() => {
    if (!paypalError && !paypalIsLoading && paypal?.clientId && order && !order.isPaid) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': paypal.clientId, currency: 'USD' },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPayPalScript()
    }
  }, [order, paypal, paypalError, paypalIsLoading, paypalDispatch])

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('PAYMENT VERIFIED')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }

  const deliveryHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('ASSET DISPATCHED')
    } catch (error) {
      toast.error(error?.data?.message || 'Update failed')
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-black tracking-[1em] uppercase animate-pulse text-4xl italic">
        SYNCING_SYSTEM...
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-10 text-orange-600 font-black text-3xl uppercase tracking-tighter">
        ERROR // {error?.data?.message || error.error}
      </div>
    )

  return (
    <div className="bg-black min-h-screen text-white pb-32 selection:bg-orange-600/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* --- MEGA HEADER --- */}
        <div className="py-16 border-b-2 border-zinc-900 mb-16">
          <Link
            to="/admin/orderlist"
            className="text-zinc-600 hover:text-white text-xs font-black uppercase tracking-[0.4em] transition flex items-center mb-10">
            <span className="mr-4 text-xl">←</span> BACK TO ARCHIVE
          </Link>

          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
                ORDER <br />
                <span className="text-orange-600">MANIFEST</span>
              </h1>
              <p className="font-mono text-zinc-500 text-xl tracking-tighter mt-6">
                ID_CORE: {order?._id}
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-[300px]">
              <StatusIndicator
                condition={order?.isPaid}
                trueText="TRANSACTION_VERIFIED"
                falseText="AWAITING_FUNDS"
                date={order?.paidAt}
              />
              <StatusIndicator
                condition={order?.isDelivered}
                trueText="ASSET_DISPATCHED"
                falseText="PREPARING_SHIPMENT"
                date={order?.deliveredAt}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: INFORMATION ARCHITECTURE */}
          <div className="lg:col-span-8 space-y-20">
            {/* Logistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-orange-600 text-sm font-black uppercase tracking-[0.4em]">
                  RECIPIENT_DATA
                </h3>
                <div className="space-y-2">
                  <p className="text-4xl font-black uppercase tracking-tighter">
                    {order?.user?.name || 'UNRESOLVED_USER'}
                  </p>
                  <p className="text-zinc-500 text-xl font-medium">
                    {order?.user?.email || 'NO_EMAIL_FOUND'}
                  </p>
                  <div className="text-zinc-400 text-xl pt-4 leading-tight uppercase font-bold">
                    {order?.shippingAddress?.address}
                    <br />
                    {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}
                    <br />
                    {order?.shippingAddress?.country}
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:border-l-2 md:border-zinc-900 md:pl-12">
                <h3 className="text-orange-600 text-sm font-black uppercase tracking-[0.4em]">
                  GATEWAY_METHOD
                </h3>
                <div className="space-y-2">
                  <p className="text-4xl font-black uppercase tracking-tighter">
                    {order?.paymentMethod}
                  </p>
                  <p
                    className={`text-xl font-black italic uppercase ${
                      order?.isPaid ? 'text-emerald-400' : 'text-orange-500'
                    }`}>
                    {order?.isPaid ? '// FUNDS_SECURED' : '// AUTHORIZATION_PENDING'}
                  </p>
                </div>
              </div>
            </div>

            {/* Item Manifest */}
            <div className="space-y-10">
              <h2 className="text-sm font-black uppercase tracking-[0.5em] text-zinc-700 border-b-2 border-zinc-900 pb-6">
                ASSET_LISTING
              </h2>
              <div className="divide-y-2 divide-zinc-900">
                {order?.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="py-10 flex flex-col sm:flex-row sm:items-center gap-10 group">
                    <div className="relative overflow-hidden bg-zinc-900 shrink-0 w-32 h-32">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-3xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors block leading-none mb-2">
                        {item.name}
                      </Link>
                      <p className="text-zinc-500 font-black text-xl italic uppercase tracking-widest">
                        UNITS: {item.qty} &times; ${item.price}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-black text-4xl tracking-tighter text-white italic">
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FINANCIAL SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-white text-black p-10 sticky top-10 shadow-[20px_20px_0px_rgba(234,88,12,1)]">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 border-b-4 border-black pb-4 italic">
                TOTAL_COST
              </h2>

              <div className="space-y-6 text-xl font-bold uppercase tracking-tight">
                <div className="flex justify-between text-zinc-500">
                  <span>SUBTOTAL</span>
                  <span className="text-black font-black">${order?.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>LOGISTICS</span>
                  <span className="text-black font-black">${order?.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>TAX_ID</span>
                  <span className="text-black font-black">${order?.taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-8 border-t-4 border-black mt-8">
                  <span className="text-black font-black text-2xl">FINAL</span>
                  <span className="text-black font-black text-5xl tracking-tighter italic">
                    ${order?.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {!order?.isPaid && (
                <div className="mt-12 space-y-6">
                  {isPending ? (
                    <div className="h-24 bg-zinc-100 flex items-center justify-center text-xs font-black uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
                      HANDSHAKE_IN_PROGRESS...
                    </div>
                  ) : (
                    <div className="min-h-[150px]">
                      {paymentIsLoading && (
                        <div className="text-xs font-black text-orange-600 mb-4 animate-bounce uppercase tracking-widest">
                          ENCRYPTING_TRANSACTION...
                        </div>
                      )}
                      <PayPalButtons
                        createOrder={(data, actions) =>
                          actions.order.create({
                            purchase_units: [{ amount: { value: order.totalPrice } }],
                          })
                        }
                        onApprove={onApprove}
                        style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                <div className="mt-10 pt-10 border-t-2 border-zinc-100">
                  <button
                    onClick={deliveryHandler}
                    disabled={deliveryIsLoading}
                    className="w-full bg-black text-white font-black py-8 text-xl hover:bg-orange-600 transition-all uppercase tracking-widest italic disabled:opacity-50">
                    {deliveryIsLoading ? 'PROCESSING...' : 'DISPATCH_ASSET'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsOrder
