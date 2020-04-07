import express from 'express'
import { categoriesApi } from '../controllers/categories.controller'
import authMiddleware from '../middlewares/auth.middleware'

/**
 * Categories router
 */
const router: express.Router = express.Router()

router.get ( '/', authMiddleware, categoriesApi.getCategories.bind(categoriesApi))

export default router
