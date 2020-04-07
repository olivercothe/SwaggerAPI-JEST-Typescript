import {
  getConnection,
} from "typeorm";
import Categories from "../entities/Categories";
import config from '../config/config'

/**
 * Category model
 *
 * @class Category
 */
class CategoryModel {
  /**
   * Check if category exists
   *
   * @class Category
   * @method isExistRow
   * @param id
   * @return {Object}
   */
  async isExistRow(categoryId: string) {
    try {
      let count = await getConnection(config.env)
        .getRepository(Categories)
        .createQueryBuilder("categories")
        .where("categories.category_id = :id", { id: categoryId })
        .getCount();

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
   * Add category
   *
   * @class Category
   * @method add
   * @param data
   * @returns {Object}
   */
  async add(data: Object) {
    try {
      const result = await getConnection(config.env)
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values(data)
        .execute();
      return {
        success: true,
        categoryId: result.raw[0].category_id
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
   * Update category by category_id
   *
   * @param id
   * @param data
   * @returns {Object}
   */
  async updateById(id: string, data: Object) {
    try {
      await getConnection(config.env)
        .createQueryBuilder()
        .update(Categories)
        .set(data)
        .where("categories.category_id = :id", { id: id })
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
   * Get categories by user id
   *
   * @class Category
   * @method getByUserId
   * @param id
   * @returns {Object} return category data
   */
  async getByUserId(id: string) {
    try {
      const categories = await getConnection(config.env)
        .createQueryBuilder(Categories, "c")
        .leftJoin("category_users", "c_u", "c.category_id::text = c_u.category_id::text")
        .where("c_u.user_id = :id", { id: id })
        .getMany()
      return {
        success: true,
        categories: categories
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        error: true
      };
    }
  }
}

export const categoryModel = new CategoryModel();
