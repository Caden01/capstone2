const express = require("express");
const Country = require("../models/country");

const router = new express.Router();

/** GET / returns:
 *   { countries : [{ country_name, capital, region, subregion, population}]}
 */
router.get("/", async function (req, res, next) {
  try {
    const countries = await Country.findAll();
    return res.json({ countries });
  } catch (err) {
    return next(err);
  }
});

/** GET /[country_name] returns: { country } */

router.get("/:country_name", async function (req, res, next) {
  try {
    const country = await Country.get(req.params.country_name);
    return res.json({ country });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
