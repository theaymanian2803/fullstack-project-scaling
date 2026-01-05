import mongoose from 'mongoose'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import products from './data/data.js'
import usersSample from './usersData.js'
import dotenv from 'dotenv'
import conncectDB from './config/db.js'
dotenv.config()
conncectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(usersSample)
    const adminUser = createdUsers[0]._id

    const sampleData = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleData)
    console.log('Data imported successfully')
    process.exit()
  } catch (error) {
    console.error('Error importing data:', error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data destroyed successfully')
    process.exit()
  } catch (error) {
    console.error('Error destroying data:', error)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
