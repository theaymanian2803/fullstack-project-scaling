import express from 'express'
import AuthenticationGoogle from '../controller/googleController.js'
const router = express.Router()

router.post('/', AuthenticationGoogle)
export default router
