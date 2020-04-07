import express from "express"
const cookieParser = require("cookie-parser")
const multer = require('multer')
const upload = multer()
const logger = require('morgan')
const path = require('path')

import apiRouter from "./routes/index"
const cors = require('cors')

/**
 * The server app
 *
 * @class App
 */
class App {
  public app: express.Application

  /**
   * Constructor
   *
   * @class App
   * @constructor
   */
  constructor() {
    // create express app
    this.app = express()

    // config app
    this.config()
    this.app.use(cors({credentials:true, origin: true, optionsSuccessStatus: 200}))
    // set router
    this.app.use("/api/v1", apiRouter)
    this.app.use('/public/uploads', express.static(path.join(__dirname, '../public/uploads')))
  }

  /**
   * Bootstrap the application
   *
   * @class App
   * @method bootstrap
   * @static
   */
  public static bootstrap(): App {
    return new App()
  }

  /**
   * Configure app
   *
   * @class App
   * @method config
   * @return void
   */
  private config(): void {
    // request log
    this.app.use(logger('dev'))
    // allow parse cookie
    this.app.use(cookieParser())
    // support application/json type post data
    this.app.use(express.json())
    // support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: true }))
  }
}

let serverApp = App.bootstrap()

export default serverApp.app
