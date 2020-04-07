import { Request, Response, NextFunction } from "express"
import { notificationApi } from './notification.controller'
import { userModel } from '../models/user.model'
import config from "../config/config"
import httpStatus from "../constants/codes"
import httpMessage from "../constants/messages"

const jwt = require("jsonwebtoken")
const AppConstant = require('../constants/app'), Role = AppConstant.Role

/**
 * Admin controller
 *
 * @class AdminController
 */
class AdminController {
  /**
   * Constructor
   *
   * @class AdminController
   * @constructor
   */
  constructor() {}

  /**
   * Get users by client id
   *
   * @class AdminController
   * @method getUsers
   */
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    return
  }

  /**
   * Get actions of admin user
   *
   * @class AdminController
   * @method getActions
   */
  public async getActions(req: Request, res: Response, next: NextFunction) {
    return res.json({
      code: httpStatus.OK,
      data: [],
      message: httpMessage.SUCCESS
    })
  }

  /**
   * addAdminUser
   *
   * @class AdminController
   * @method addAdmin
   */
  public async addAdmin(req: Request, res: Response, next: NextFunction) {
    const { email, first_name, last_name } = req.body

    if ((!email) || (!first_name) || (!last_name)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      // check admin exist
      const result = await userModel.isExistRow(email)
      if (result.success && result.exist) {
        if( res ) res.status( httpStatus.BAD_REQUEST )
        return res.json({
          code: httpStatus.BAD_REQUEST,
          message: httpMessage.USER_ALREADY_EXIST
        })
      } else if (!result.success) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
        return res.json({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpMessage.DATABASE_QUERY_ERROR
        })
      }

      const ret = await userModel.add({email, first_name, last_name, role:Role.ADVISOR})
      if (ret.success) {
        // create token
        let token = jwt.sign({'uUid': ret.userId, 'uEmail': req.body.email}, config.jwtSecret)
        // send email
        // success
        res.status(httpStatus.OK)
        // send email
        let link = config.baseUrl + '/confirm?user=' + token
        notificationApi.registeredNewUser( 'admin', email, link, 'en')
        return res.json({
          code: httpStatus.OK,
          data: {token: token},
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

export const adminApi = new AdminController()
