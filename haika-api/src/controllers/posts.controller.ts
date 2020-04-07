import { Request, Response, NextFunction } from "express"
import config from "../config/config"
import httpStatus from "../constants/codes"
import httpMessage from "../constants/messages"
import { postModel } from '../models/post.model'
import { userPostsModel } from '../models/user_posts.model'

/**
 * Posts controller
 *
 * @class PostsController
 */

class PostsController {
  /**
   * Constructor
   *
   * @class PostsController
   * @constructor
   */
  constructor() {}

  /**
   * View posts of user
   *
   * @class PostsController
   * @method viewPosts
   */
  public async viewPosts(req: Request, res: Response, next: NextFunction) {
    const { uUid }  = req.app.get('self')
    console.log(req)
    try {
      const result = await postModel.getByUserId(uUid)
      if (result.success) {
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          data: result.posts,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch ( err ) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }

  /**
   * Add posts
   *
   * @class PostsController
   * @method viewPostsByUser
   */
  public async viewPostsByUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    if(!userId) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const result = await postModel.getByUserId(userId)
      if (result.success) {
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          data: result.posts,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch ( err ) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }


  /**
   * View pointed post of user
   *
   * @class PostsController
   * @method viewPost
   */
  public async viewPost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params
    try {
      const result = await postModel.getPostInfo(postId)
      if (result.success) {
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          data : result.post,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch(err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }

  /**
   * View posts By category
   *
   * @class PostsController
   * @method viewCategoryPosts
   */
  public async viewCategoryPosts(req: Request, res: Response, next: NextFunction) {
    const { userId, categoryId } = req.params
    if((!userId) || (!categoryId)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const result = await postModel.getByCategory(userId, categoryId)
      if (result.success) {
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          data: result.posts,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch ( err ) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }

  /**
   * Add posts
   *
   * @class PostsController
   * @method addPost
   */
  public async addPost(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    const { list, state, categoryId } = req.body
    const files = req.files

    if ((!files) || (!list) || (!state) || (!categoryId)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }
    let fileNames = []
    for (let file of files) {
      console.log(file)
      fileNames.push(file.filename)
    }

    try {
      const ret = await postModel.add({images: fileNames, list, state, link: files[0].destination})
      if (ret.success) {
        await userPostsModel.add({'user_id': uUid, 'post_id': ret.postId, 'category_id': categoryId})
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch ( err ) {
      // error
      console.log("Post add failure")
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }

  /**
   * Update posts
   *
   * @class PostsController
   * @method updatePost
   */
  public async updatePost(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    const { postId } = req.params
    const { list, state, categoryId } = req.body
    let postInfo = {}

    if (!postId) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    const files = req.files
    if (files) {
      let fileNames = []
      for (let file of files) {
        fileNames.push(file.filename)
      }
      Object.assign({'images': fileNames}, postInfo)
    }

    if (list) {
      Object.assign({'list': list}, postInfo)
    }

    if (state) {
      Object.assign({'state': state}, postInfo)
    }

    if (categoryId) {
      Object.assign({'category_id': categoryId}, postInfo)
    }

    //check posts exist
    const result = await postModel.isExistRow(postId)
    if ((result.success) && (!result.exist)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.POST_ID_INVALID
      })
    } else if (!result.success) {
      throw new Error()
    }

    try {
      const ret = await postModel.updateById(postId, postInfo)

      if (categoryId) {
        await userPostsModel.update(uUid, postId,{category_id: categoryId})
      }
      if (ret.success) {
        if( res ) res.status( httpStatus.OK )
        return res.json({
          code: httpStatus.OK,
          message: httpMessage.SUCCESS
        })
      } else {
        throw new Error()
      }
    } catch ( err ) {
      // error
      res.status(httpStatus.INTERNAL_SERVER_ERROR)
      return res.json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpMessage.INTERNAL_SERVER_ERROR
      })
    }
  }
}

export const postsApi = new PostsController()
