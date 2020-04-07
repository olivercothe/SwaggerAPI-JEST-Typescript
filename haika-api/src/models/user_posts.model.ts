import { getConnection } from "typeorm"
import UserPosts from "../entities/UserPosts"
import config from '../config/config'

/**
 * UserPosts model
 *
 * @class UserPosts
 */
class UserPostModel {

  /**
   * Add userposts by userId
   *
   * @class UserPosts
   * @method add
   * @param data
   * @returns {Object}
   */

  async add(data: Object) {
    try {
      const result = await getConnection(config.env)
        .createQueryBuilder()
        .insert()
        .into(UserPosts)
        .values(data)
        .execute()
      return {
        success: true
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

  async update(userId:string, postId: string, data: Object) {
    try {
      await getConnection(config.env)
          .createQueryBuilder()
          .update(UserPosts)
          .set(data)
          .where("users.user_id = :userId", { userId: userId })
          .andWhere("users.post_id = :postId", { postId: postId })
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
}

export const userPostsModel = new UserPostModel()
