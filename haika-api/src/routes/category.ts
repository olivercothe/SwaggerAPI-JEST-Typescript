import express from 'express'
import { categoriesApi } from '../controllers/categories.controller'
import authMiddleware from '../middlewares/auth.middleware'
import {userApi} from "../controllers/user.controller"

/**
 * Category router
 */
const router: express.Router = express.Router()

router.put ( '/:categoryId', authMiddleware, categoriesApi.editCategory.bind(userApi))
router.post ( '/', authMiddleware, categoriesApi.addCategory.bind(userApi))

export default router
