import express from 'express'
import { userApi } from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware'

/**
 * User router
 */
const router: express.Router = express.Router()

router.get ( '/', authMiddleware, userApi.getProfile.bind(userApi))
//router.get ( '/:userId', authMiddleware, userApi.getProfileById.bind(userApi))
router.put ( '/', authMiddleware, userApi.editProfile.bind(userApi))
router.post ( '/', authMiddleware, userApi.addUser.bind(userApi))

export default router

