import express from 'express'
import authMiddleware from "../middlewares/auth.middleware"
import { postsApi } from "../controllers/posts.controller"

/**
 * Posts router
 */

const router: express.Router = express.Router()

router.get ( '/', authMiddleware, postsApi.viewPosts.bind(postsApi))

export default router
