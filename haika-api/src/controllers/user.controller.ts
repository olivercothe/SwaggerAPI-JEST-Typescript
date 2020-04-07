import { Request, Response, NextFunction } from "express"
import config from "../config/config"
import httpStatus from "../constants/codes"
import httpMessage from "../constants/messages"
import { userModel } from "../models/user.model"
import { clientAdvisorsModel } from "../models/client_advisors.model"
import {notificationApi} from "./notification.controller";
const jwt = require("jsonwebtoken")
const AppConstant = require('../constants/app'), Role = AppConstant.Role

/**
 * User controller
 *
 * @class UserController
 */
class UserController {
  /**
   * Constructor
   *
   * @class UserController
   * @constructor
   */
  constructor() {}

  /**
   * Get Profile of user
   *
   * @class UserController
   * @method getProfile
   */
  public async getProfile(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    try {
      // check admin exist
      const ret = await userModel.getById(uUid)
      if (ret.success) {
        if( res ) res.status( httpStatus.OK )
        return res.json({
          code: httpStatus.OK,
          data: ret.user,
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
   * Get Profile of other user
   *
   * @class UserController
   * @method getProfileById
   */
  public async getProfileById(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params
    if (!userId) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }
    try {
      const ret = await userModel.getById(userId)
      if (ret.success) {
        if( res ) res.status( httpStatus.OK )
        return res.json({
          code: httpStatus.OK,
          data: ret.user,
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
   * Edit Profile of user
   *
   * @class UserController
   * @method editProfile
   */
  public async editProfile(req: Request, res: Response, next: NextFunction) {
    const { uUid } = req.app.get('self')
    const { first_name, last_name } = req.body
    if((!first_name) || (!last_name)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const user = { first_name, last_name}
      const ret = await userModel.updateById(uUid, user)

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
   * Add Profile of user
   *
   * @class UserController
   * @method addUser
   */
  public async addUser(req: Request, res: Response, next: NextFunction) {
    const { uUid, uEmail } = req.app.get('self')
    const { email, first_name, last_name } = req.body

    if( (!email) || (!first_name) || (!last_name)) {
      if( res ) res.status( httpStatus.BAD_REQUEST )
      return res.json({
        code: httpStatus.BAD_REQUEST,
        message: httpMessage.INVALID_INPUT_PARAMS
      })
    }

    try {
      const result = await userModel.isExistRow(email)
      if (result.success && result.exist) {
        if( res ) res.status( httpStatus.BAD_REQUEST )
        return res.json({
          code: httpStatus.BAD_REQUEST,
          message: httpMessage.USER_ALREADY_EXIST
        })
      } else if (!result.success) {
        throw new Error()
      }

      const ret = await userModel.add({email, first_name, last_name, role:Role.CLIENT})
      if (ret.success) {
        // create token
        let token = jwt.sign({'uUid': ret.userId, 'uEmail': req.body.email}, config.jwtSecret)
        await clientAdvisorsModel.add({client_user_id: uUid, advisor_user_id: ret.userId})
        await userModel.updateById(uUid, {role: Role.ADVISOR})
        // send email
        let link = config.baseUrl + '/confirm?user=' + token
        notificationApi.registeredNewUser( uEmail, email, link, 'en')
        // success
        res.status(httpStatus.OK)
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

  public async deleteTestUsers(testUser:string) {
    try {
      await userModel.deleteTestUsers(testUser)
    } catch ( err ) {
      console.log(err)
    }
  }
}

export const userApi = new UserController()
