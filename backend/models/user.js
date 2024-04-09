const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnathorizedError,
} = require("../expressError");

class User {
  /** Register a new user
   *
   * Returns { username, fisrtName, lastName, email }
   *
   * Throws BadRequestError if it is a duplicate username
   */
  static async register({ username, password, firstName, lastName, email }) {
    const checkIfDuplicate = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1
      `,
      [username],
    );

    if (checkIfDuplicate.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.query(
      `INSERT INTO users
         (username,
          password,
          first_name,
          last_name,
          email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, first_name AS "firstName", last_name AS "lastName", email
      `,
      [username, hashedPassword, firstName, lastName, email],
    );

    const user = result.rows[0];

    return user;
  }

  /** Finds all users
   *
   * Return [{ username, first_name, last_name, email }]
   */
  static async findAll() {
    const result = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
         FROM users
         ORDER BY username
      `,
    );

    return result.rows;
  }

  /** Return data about a specific user
   *
   * Returns { username, first_name, last_name }
   *
   * Throws NotFoundError if user doesn't exist
   */
  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email
         FROM users 
         WHERE username = $1
      `,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data
   *
   * Not all fields need to be provided
   *
   * Data can include: { username, firsName, lastName, email }
   *
   * If no data given throw BadRequestError
   * If username isn't unique throw BadRequestError
   * If no user found throw NotFoundError
   */

  static async update(paramUsername, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new BadRequestError("No data");

    const { username, firstName, lastName, email } = data;

    const checkIfDuplicate = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1
      `,
      [username],
    );

    if (checkIfDuplicate.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    let query = `UPDATE users SET `;

    if (username) {
      query += `username = '${username}', `;
    }

    if (firstName) {
      query += `first_name = '${firstName}', `;
    }

    if (lastName) {
      query += `last_name = '${lastName}', `;
    }

    if (email) {
      query += `email = '${email}', `;
    }

    query = query.slice(0, -2);

    query += ` WHERE username = $1 RETURNING username, first_name AS "firstName", last_name AS "lastName", email;`;

    const result = await db.query(query, [paramUsername]);

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${paramUsername}`);

    return user;
  }

  /** Deletes a user from the database */

  static async remove(username) {
    let result = await db.query(
      `DELETE
          FROM users
          WHERE username = $1
          RETURNING username
      `,
      [username],
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;
