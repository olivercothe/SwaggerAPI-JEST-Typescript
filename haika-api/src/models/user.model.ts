import { getConnection } from "typeorm"
import Users from "../entities/Users"
import config from '../config/config'

/**
 * User model
 *
 * @class User
 */
class UserModel {
  /**
   * Check if userId exists
   *
   * @class Customer
   * @method isExistRow
   * @param id
   * @return {Object}
   */
  async isExistRow(email: string) {
    try {
      let count = await getConnection(config.env)
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.email = :email", { email: email })
        .getCount()

      return {
        success: true,
        exist: count > 0 ? true : false
      }
    } catch (error) {
      // log error
      return {
        success: false,
        error: true
      }
    }
  }

  /**
   * Add user
   *
   * @class User
   * @method add
   * @param data
   * @returns {Object}
   */
  async add(data: Object) {
    try {
      const result = await getConnection(config.env)
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(data)
        .execute()
      return {
        success: true,
        userId: result.raw[0].user_id
      }
    } catch (error) {
      // log error
      console.log(error)
      return {
        success: false,
        error: true
      }
    }
  }

  /**
   * Update user by user_id
   *
   * @param id
   * @param data
   * @returns {Object}
   */
  async updateById(id: string, data: Object) {
    try {
      await getConnection(config.env)
        .createQueryBuilder()
        .update(Users)
        .set(data)
        .where("users.user_id = :id", { id: id })
        .execute()
      return {
        success: true,
      }
    } catch (error) {
      // log error
      console.log(error)
      return {
        success: false,
        error: true
      }
    }
  }

  /**
   * Get user by userId
   *
   * @class User
   * @method getById
   * @param id
   * @returns {Object} return user data
   */
  async getById(id: string) {
    try {
      const User = await getConnection(config.env)
        .getRepository(Users)
        .createQueryBuilder("users")
        .where("users.user_id = :id", { id: id })
        .getOne()
      return {
        success: true,
        user: User
      }
    } catch (error) {
      // log error
      return {
        success: false,
        error: true
      }
    }
  }

  async deleteTestUsers(testUser:string) {
    try {
      const User = await getConnection(config.env)
          .createQueryBuilder()
          .delete()
          .from(Users)
          .where('"email" = :email', {
            email: testUser
          })
          .execute();
      return {
        success: true,
      }
    } catch (error) {
      // log error
      return {
        success: false,
      }
    }
  }
}

export const userModel = new UserModel()
