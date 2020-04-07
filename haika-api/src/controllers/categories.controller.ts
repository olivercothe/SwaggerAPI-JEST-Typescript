import { Request, Response, NextFunction } from "express"
import config from "../config/config"
import httpStatus from "../constants/codes"
import httpMessage from "../constants/messages"
import { categoryModel } from "../models/category.model"
import { categoryUsersModel } from "../models/category_users.model"

/**
 * Categories controller
 *
 * @class CategoriesController
 */
class CategoriesController {
  /**
   * Constructor
   *
   * @class CategoriesController
   * @constructor
   */
  constructor() {}

  /**
   * Get categories of user
   *
   * @class CategoriesController
   * @method getCategories
   */
  public async getCategories(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    console.log(uUid)
    try {
      const ret = await categoryModel.getByUserId(uUid)
      if (ret.success) {
        if( res ) res.status( httpStatus.OK )
        return res.json({
          code: httpStatus.OK,
          data: ret.categories,
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

  /**
   * Get categories of other user
   *
   * @class CategoriesController
   * @method getCategoriesByUserId
   */
  public async getCategoriesByUserId(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    if(!userId) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const ret = await categoryModel.getByUserId(userId)
      if (ret.success) {
        if( res ) res.status( httpStatus.OK )
        return res.json({
          code: httpStatus.OK,
          data: ret.categories,
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

  /**
   * Edit category
   *
   * @class CategoriesController
   * @method editCategory
   */
  public async editCategory(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    const { categoryId } = req.params
    const { category } = req.body

    if((!category) || (!categoryId)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    // check category exist
    const result = await categoryModel.isExistRow(categoryId)
    if ((result.success) && (!result.exist)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.CATEGORY_ID_INVALID
      })
    } else if (!result.success) {
      throw new Error()
    }

    try {
      const categoryInfo = { category }
      const ret = await categoryModel.updateById(categoryId, categoryInfo)

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

  /**
   * Add　category
   *
   * @class CategoriesController
   * @method addCategory
   */
  public async addCategory(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    const { category } = req.body

    if( !category) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const ret = await categoryModel.add({category})
      if (ret.success) {
        await categoryUsersModel.add({category_id: ret.categoryId, user_id: uUid})
        // send email
        // success
        res.status(httpStatus.OK)
        return res.json({
          code: httpStatus.OK,
          message: httpMessage.SUCCESS
        })
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

export const categoriesApi = new CategoriesController()
