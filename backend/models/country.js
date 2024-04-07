const db = require("../db");
const { NotFoundError } = require("../expressError");

class Country {
  /** Find all countries
   *
   * Returns [{ country_name, capital, region, subregion, population}]
   */
  static async findAll() {
    const countryRes = await db.query(
      `
       SELECT country_name,
              capital,
              region,
              subregion,
              population
       FROM countries
       ORDER BY country_name
      `,
    );
    return countryRes.rows;
  }

  /** Return data about a specific country
   *
   * Returns { country_name, capital, region, subregion, population }
   *
   * Throws NotFoundError if not found
   */

  static async get(country_name) {
    const countryRes = await db.query(
      `SELECT country_name,
              capital,
              region,
              subregion,
              population
       FROM countries
       WHERE country_name = $1
      `,
      [country_name],
    );

    const country = countryRes.rows[0];

    if (!country) throw new NotFoundError(`No country: ${country_name}`);

    return country;
  }
}

module.exports = Country;
