import asyncHandler from '../middleware/asyncHandler.js'
import Order from './../models/OrderModel.js'

//desc create order route
//route POST /api/orders
//private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  let order
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    order = new Order({
      orderItems: orderItems.map((x) => ({
        name: x.name,
        qty: x.qty,
        image: x.images[0],
        price: x.price,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    })
  }
  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

//desc get logged in user order
//route GET /api/orders/myorders
//private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// desc get order by id
// route GET /api/orders/:id
// private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  return res.json(order)
})

// desc update order to paid
// route PUT /api/orders/:id/pay
// private/ admin

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
  }
  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})

// desc update order to delivered
// route PUT /api/orders/:id/deliver
// private / admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
  }
  const updatedOrder = await order.save()
  res.status(200).json(updatedOrder)
})

// desc get all orderes

// route GET /api/orders
// private / admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  return res.json(orders)
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
}
