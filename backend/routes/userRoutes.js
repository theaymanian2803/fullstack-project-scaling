import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
// Route: /api/users
// Description: Register user (Public) & Get all users (Private/Admin)
// protect runs FIRST, then admin
router.route('/').post(registerUser).get(protect, admin, getUsers)

// Route: /api/users/login
// Description: Auth user & get token (Public)
router.post('/login', authUser)

// Route: /api/users/logout
// Description: Logout user (Public/Private)
router.post('/logout', logoutUser)

// Route: /api/users/profile
// Description: Get & Update user profile (Private)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

// Route: /api/users/:id
// Description: Get, Delete, Update user by ID (Private/Admin)
// FIXED: protect runs FIRST, then admin
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
