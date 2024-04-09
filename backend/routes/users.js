const express = require("express");
const { BadRequestError, ExpressError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/token");

const router = express.Router();

/** Registers a new user and adds it to the database
 *
 * Returns { user, token }
 */

router.post("/", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET /
 *
 * Returns a list of all users from database
 */

router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username]
 *
 * Returns { username, firstName, lastName }
 */

router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** POST /[username]
 *
 * Data can include: { username, firstName, lastName, email }
 *
 * Returns { username, firstName, lastName, email }
 */

router.post("/:username", async function (req, res, next) {
  try {
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]
 *
 * Returns { deleted: username }
 */

router.delete("/:username", async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
