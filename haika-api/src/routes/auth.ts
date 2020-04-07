import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import {authApi} from "../controllers/auth.controller"

/**
 * Auth router
 */
const router: express.Router = express.Router()

router.get ( '/confirm', authMiddleware, authApi.confirm.bind(authApi))

export default router
