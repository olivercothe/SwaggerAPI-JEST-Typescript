import express, {Request} from 'express'
import { postsApi } from '../controllers/posts.controller'
import authMiddleware from "../middlewares/auth.middleware"
const fs = require('fs')
const multer = require('multer')
const mime = require('mime-types')
const PathConstant = require('../constants/path'), UploadPath = PathConstant.UploadPath

/**
 * Save image filename
 */
let filename = ''

/**
 * Save image to specific path
 */
const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        let targetDir = UploadPath.UPLOADORIGIN

        if (!fs.existsSync(targetDir))
            fs.mkdirSync(targetDir)

        targetDir = UploadPath.POSTS

        if (!fs.existsSync(targetDir))
            fs.mkdirSync(targetDir)

        cb(null, targetDir)
    },
    filename: function (req:Request, file: any, cb: any) {
        filename = Date.now() + '_' + file.originalname
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage
})

/**
 * Post router
 */

const router: express.Router = express.Router()

router.post ( '/', authMiddleware, upload.array('images', 12), postsApi.addPost.bind(postsApi))
router.put ( '/:postId', authMiddleware, upload.array('images', 12), postsApi.updatePost.bind(postsApi))

export default router
