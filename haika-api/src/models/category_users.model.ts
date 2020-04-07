import { getConnection } from "typeorm";
import CategoryUsers from "../entities/CategoryUsers";
import config from '../config/config'

/**
 * CategoryUsers model
 *
 * @class CategoryUsers
 */
class CategoryUsersModel {
  /**
   * Add Category
   *
   * @class ClientAdvisor
   * @method add
   * @param data
   * @returns {Object}
   */
  async add(data: Object) {
    try {
      const result = await getConnection(config.env)
        .createQueryBuilder()
        .insert()
        .into(CategoryUsers)
        .values(data)
        .execute();
      return {
        success: true,
        userId: result.raw[0].id
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

export const categoryUsersModel = new CategoryUsersModel();
