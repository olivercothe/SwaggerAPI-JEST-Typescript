import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')
import config from '../config/config'
import httpStatus from '../constants/codes'
import httpMessage from '../constants/messages'

/**
 * Check auth token
 * 
 * @middleware
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  /**
   * Function that check auth token
   *
   * @param   object req
   * @param   object res
   * @param   object next
   * @return  json if auth token is invalid returns json else go to next()
   */

    let token = req.headers['authorization']
  　let jwtPayload;

    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
      }
      try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret)
        if (jwtPayload) {
          req.app.set('self', jwtPayload)
          next()
        } else {
          throw new Error();
        }
      } catch (e) {
        return res.json({
          code: httpStatus.INVALID_AUTH_TOKEN,
          message: httpMessage.INVALID_AUTH_TOKEN,
        })
      }
    } else {
      res.status(httpStatus.INVALID_AUTH_TOKEN)
      return res.json({
        code: httpStatus.INVALID_AUTH_TOKEN,
        message: httpMessage.INVALID_AUTH_TOKEN,
      })
    }
}

export async function authMiddlewareWithLink(req: Request, res: Response, next: NextFunction) {

  /**
   * Function that check auth token
   *
   * @param   object req
   * @param   object res
   * @param   object next
   * @return  json if auth token is invalid returns json else go to next()
   */

  let token = req.query.user
  let jwtPayload;

  if (token) {
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret)
      if (jwtPayload) {
        req.app.set('self', jwtPayload)
        next()
      } else {
        throw new Error();
      }
    } catch (e) {
      res.status(httpStatus.INVALID_AUTH_TOKEN)
      return res.json({
        code: httpStatus.INVALID_AUTH_TOKEN,
        message: httpMessage.INVALID_AUTH_TOKEN,
      })
    }
  } else {
    res.status(httpStatus.INVALID_AUTH_TOKEN)
    return res.json({
      code: httpStatus.INVALID_AUTH_TOKEN,
      message: httpMessage.INVALID_AUTH_TOKEN,
    })
  }
}

export default authMiddleware
