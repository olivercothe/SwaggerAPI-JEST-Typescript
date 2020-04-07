import { getConnection } from "typeorm"
import config from '../config/config'
import ClientAdvisors from "../entities/ClientAdvisors";

/**
 * ClientAdvisor model
 *
 * @class ClientAdvisors
 */
class ClientAdvisorsModel {
  /**
   * Add Advisor
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
        .into(ClientAdvisors)
        .values(data)
        .execute()
      return {
        success: true,
        userId: result.raw[0].id
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

export const clientAdvisorsModel = new ClientAdvisorsModel()
