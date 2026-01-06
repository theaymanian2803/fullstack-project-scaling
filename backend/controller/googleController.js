import { OAuth2Client } from 'google-auth-library'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import { generateToken } from './../utils/generateToken.js'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const AuthenticationGoogle = asyncHandler(async (req, res) => {
  const { token } = req.body

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const { name, email, picture } = ticket.getPayload()

  // 1. Find or create the user
  // We use picture as well so your frontend displays the Google avatar
  let user = await User.findOne({ email })

  if (!user) {
    user = await User.create({
      name,
      email,
      password: Math.random().toString(36).slice(-8), // Dummy password for required fields
      isAdmin: false,
    })
  }

  // 2. Generate the JWT cookie using your utility
  generateToken(res, user._id)

  // 3. Send SINGLE response to match your Redux 'userInfo' format
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    // image: picture, // Optional: if you want to save/show their Google photo
  })
})

export default AuthenticationGoogle
