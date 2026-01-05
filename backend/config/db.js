import mongoose from 'mongoose'

const conncectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('something went wrong' + error.message)
    process.exit(1)
  }
}
export default conncectDB

//
