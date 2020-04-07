const dotenv = require('dotenv')
var path = require('path')

class Config {

  public host: string = ''
  public port: number = 0
  public jwtSecret: string = ''
  public authTokenId: string = ''
  public authTokenTime: number =  0
  public env: string = ''
  public baseUrl = ''

  /** 
   * Constructor
   * 
   * @class Config
   * @constructor
   */
  constructor() {
    // init .env
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`
    })
    // load .env
    this.loadDotEnv()
  }
  
  /**
   * Load config from .env
   * 
   * @class Config
   * @method loadDotEnv
   */
  private loadDotEnv() {
    // host
    if (process.env.HOST !== undefined) {
      this.host = process.env.HOST
    } else {
      // error log
      return
    }

    // port 
    if (process.env.PORT !== undefined) {
      this.port = parseInt(process.env.PORT)
    } else {
      // error log
      return
    }

    // port
    if ((process.env.HOST !== undefined) && (process.env.PORT !== undefined)) {
      this.baseUrl = process.env.HOST + ':' + process.env.PORT
    } else if ((process.env.HOST) && ((process.env.PORT === undefined) || (process.env.PORT === ''))) {
      this.baseUrl = process.env.HOST
    } else {
      return
    }

    // jwt token
    if (process.env.JWT_SECRET !== undefined) {
      this.jwtSecret = process.env.JWT_SECRET
    } else {
      // error log

      return
    }

    // environment
    if (process.env.NODE_ENV !== undefined) {
      this.env = process.env.NODE_ENV
      // set db connection
    } else {
      // error log
    }
  }
}

export default new Config()
