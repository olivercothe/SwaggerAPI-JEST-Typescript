import express from 'express'
import { adminApi } from '../controllers/admin.controller'
import { categoriesApi } from '../controllers/categories.controller'
import authMiddleware from '../middlewares/auth.middleware'
import {postsApi} from "../controllers/posts.controller"
import {userApi} from "../controllers/user.controller"

/**
 * Admin router
 */
const router: express.Router = express.Router()

router.get ( '/users/:userId', authMiddleware, userApi.getProfileById.bind(adminApi))
router.get ( '/post/:postId', authMiddleware, postsApi.viewPost.bind(postsApi))
router.get ( '/posts/:userId/:categoryId', authMiddleware, postsApi.viewCategoryPosts.bind(postsApi))
router.get ( '/posts/:userId', authMiddleware, postsApi.viewPostsByUser.bind(postsApi))
router.get ( '/categories/:userId', authMiddleware, categoriesApi.getCategoriesByUserId.bind(adminApi))
router.get ( '/actions', authMiddleware, adminApi.getActions.bind(adminApi))
router.post ( '/', adminApi.addAdmin.bind(adminApi))

export default router
