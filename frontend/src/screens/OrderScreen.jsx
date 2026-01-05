import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateOrderMutation } from './../slices/orderApiSlice'
import { clearCart } from './../slices/cartSlice'
import CheckoutSteps from './../components/CheckoutSteps'
import { ShoppingBag, ArrowLeft } from 'lucide-react'

function Orders() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    // Navigation guards: only run if there are items in the cart
    if (cart.cartItems.length > 0) {
      if (!cart.shippingAddress.address) {
        navigate('/shipping')
      } else if (!cart.paymentMethod) {
        navigate('/payment')
      }
    }
  }, [cart.shippingAddress, cart.paymentMethod, cart.cartItems, navigate])

  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCart())
      navigate(`/order/${res._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  // EMPTY STATE UI
  if (cart.cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 antialiased">
        <div className="mb-6 p-8 rounded-full bg-zinc-900/50 border border-zinc-800">
          <ShoppingBag className="w-16 h-16 text-orange-500" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
          Your Cart is <span className="text-orange-500">Empty</span>
        </h1>
        <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] font-light mb-10 text-center leading-relaxed">
          Looks like you haven't added anything to <br /> your collection yet.
        </p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl">
          <ArrowLeft className="w-4 h-4" />
          Return to Store
        </button>
      </div>
    )
  }

  // MAIN SUMMARY UI
  const sectionLabel = 'text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-4 block'

  return (
    <div className="min-h-screen bg-black text-white antialiased pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Order <span className="text-orange-500">Summary</span>
          </h1>
          <div className="h-1 w-20 bg-orange-500 mt-2 mx-auto md:mx-0"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: Logistics */}
          <div className="lg:col-span-2 space-y-12">
            {/* Shipping Info */}
            <section className="border-b border-zinc-800 pb-8">
              <span className={sectionLabel}>Shipping Address</span>
              <div className="text-xl font-light text-zinc-300">
                <p className="text-white font-medium uppercase tracking-tight">
                  {cart.shippingAddress.address}
                </p>
                <p className="text-sm mt-1 uppercase tracking-widest flex gap-2">
                  <span>{cart.shippingAddress.city},</span>
                  <span>{cart.shippingAddress.postalCode}</span>
                  <span className="text-orange-500 font-bold">{cart.shippingAddress.country}</span>
                </p>
              </div>
            </section>

            {/* Payment Info */}
            <section className="border-b border-zinc-800 pb-8">
              <span className={sectionLabel}>Payment Method</span>
              <p className="text-2xl font-bold uppercase tracking-tight">{cart.paymentMethod}</p>
            </section>

            {/* Order Items */}
            <section>
              <span className={sectionLabel}>Review Items ({cart.cartItems.length})</span>
              <div className="space-y-6 mt-6">
                {cart.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-6 bg-zinc-900/30 p-4 border border-zinc-800/50 hover:border-zinc-700 transition-all group">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-24 w-24 rounded-sm object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="hover:text-orange-500 transition-colors">
                        <h2 className="text-lg font-bold uppercase tracking-tight">
                          {item.name.slice(0, 30)}...
                        </h2>
                      </Link>
                      <p className="text-zinc-500 text-[10px] mt-1 tracking-widest uppercase font-bold">
                        Quantity: {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-500 font-black text-lg">
                        {item.qty * item.price} <span className="text-[10px] ml-1">MAD</span>
                      </p>
                      <p className="text-zinc-600 text-[10px] uppercase font-medium">
                        {item.price} Each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Total Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#0A0A0A] border border-zinc-800 p-8 shadow-2xl">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-8 border-b border-zinc-800 pb-4">
                Financials
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-white font-medium">{cart.itemsPrice} MAD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Shipping</span>
                  <span className="text-white font-medium">{cart.shippingPrice} MAD</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Estimated Tax
                  </span>
                  <span className="text-white font-medium">{cart.taxPrice} MAD</span>
                </div>

                <div className="pt-6 mt-6 border-t border-orange-500/30 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                    Total Amount
                  </span>
                  <span className="text-3xl font-black text-white leading-none">
                    {cart.totalPrice} <span className="text-xs">MAD</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={cart.cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
                className="w-full bg-white text-black py-5 mt-10 text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:bg-zinc-800 disabled:text-zinc-500 active:scale-95">
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest text-center font-bold">
                  {error?.data?.message || 'An error occurred'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
