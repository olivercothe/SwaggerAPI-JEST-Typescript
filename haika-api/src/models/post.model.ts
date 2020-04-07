import { getConnection } from "typeorm"
import Posts from "../entities/Posts"
import config from '../config/config'

/**
 * User model
 *
 * @class Post
 */
class PostModel {
  /**
   * Check if posts exists
   *
   * @class Posts
   * @method isExistRow
   * @param id
   * @return {Object}
   */
  async isExistRow(postId: string) {
    try {
      let count = await getConnection(config.env)
        .getRepository(Posts)
        .createQueryBuilder("posts")
        .where("posts.post_id = :id", { id: postId })
        .getCount()

      return {
        success: true,
        exist: count > 0 ? true : false
      };
    } catch (error) {
      // log error
      return {
        success: false,
        error: true
      };
    }
  }

  /**
   * Update posts by post_id
   *
   * @param id
   * @param data
   * @returns {Object}
   */
  async updateById(id: string, data: Object) {
    try {
      await getConnection(config.env)
        .createQueryBuilder()
        .update(Posts)
        .set(data)
        .where("posts.post_id = :id", { id: id })
        .execute();
      return {
        success: true,
      };
    } catch (error) {
      // log error
      console.log(error)
      return {
        success: false,
        error: true
      };
    }
  }


  /**
   * View post by userId
   *
   * @class Post
   * @method getByUserId
   * @param userId
   * @returns {Object}
   */
  async getByUserId(userId: string) {
    try {
      const posts = await getConnection(config.env)
      .createQueryBuilder(Posts, "p")
      .leftJoin("user_posts", "u_p", "p.post_id::text = u_p.post_id::text")
      .where("u_p.user_id = :id", { id: userId })
      .getMany()

      return {
        success: true,
        posts
      };
    } catch (error) {
      return {
        success: false,
        error: true
      }
    }
  }

  /**
   * View post by user and category id
   *
   * @class Post
   * @method getByUserId
   * @param userId
   * @param categoryId
   * @returns {Object}
   */
  async getByCategory(userId: string, categoryId:string) {
    try {
      const posts = await getConnection(config.env)
          .createQueryBuilder(Posts, "p")
          .leftJoin("user_posts", "u_p", "p.post_id::text = u_p.post_id::text")
          .where("u_p.user_id = :userId", { userId: userId })
          .andWhere("u_p.category_id = :categoryId", { categoryId: categoryId })
          .getMany()
      return {
        success: true,
        posts
      };
    } catch (error) {
      return {
        success: false,
        error: true
      };
    }
  }

  /**
   * View post by post id
   *
   * @class Post
   * @method getPostInfo
   * @param postId
   * @returns {Object}
   */

  async getPostInfo(postId: string) {
    try {
      const result = await getConnection(config.env)
      .getRepository(Posts)
      .createQueryBuilder('posts')
      .where("posts.post_id = :id", { id: postId})
      .getOne();
      return {
        success: true,
        post: result
      };
    } catch (error) {
      return {
        success: false,
        error: true
      };
    }
  }

  /**
   * View post by userId
   *
   * @class Post
   * @method add
   * @param userId, postId
   * @returns {Object}
   */

  async add(data: Object) {
    try {
      const result = await getConnection(config.env)
        .createQueryBuilder()
        .insert()
        .into(Posts)
        .values(data)
        .execute();
      return {
        success: true,
        postId: result.raw[0].post_id
      };
    } catch (error) {
      // log error
      console.log(error)
      return {
        success: false,
        error: true
      };
    }
  }
}

export const postModel = new PostModel()
