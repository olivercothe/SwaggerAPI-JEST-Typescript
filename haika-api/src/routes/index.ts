/**
 * Index router
 */
import * as express from 'express'
import apiAuthRouter from './auth'
import apiUserRouter from './users'
import apiAdminRouter from './admin'
import apiCategoryRouter from './category'
import apiCategoriesRouter from './categories'
import apiPostRouter from './post'
import apiPostsRouter from './posts'

const router: express.Router = express.Router()

// routes
router.use('/auth', apiAuthRouter)
router.use('/user', apiUserRouter)
router.use('/admin', apiAdminRouter)
router.use('/post', apiPostRouter)
router.use('/posts', apiPostsRouter)
router.use('/category', apiCategoryRouter)
router.use('/categories', apiCategoriesRouter)

export default router

