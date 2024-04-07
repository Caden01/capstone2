const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnathorizedError,
} = require("../expressError");

class User {
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
}

module.exports = User;
