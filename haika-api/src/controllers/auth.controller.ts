import { Request, Response, NextFunction } from "express"
import config from "../config/config"
const jwt = require("jsonwebtoken")
import httpStatus from "../constants/codes"
import httpMessage from "../constants/messages"

/**
 * Auth controller
 *
 * @class AuthController
 */
class AuthController {
  /**
   * Constructor
   *
   * @class AuthController
   * @constructor
   */
  constructor() {

  }

  public async confirm(req: Request, res: Response) {
    return res.json({
      code: httpStatus.OK,
      message: httpMessage.SUCCESS
    })
  }

}

export const authApi = new AuthController()
