const axios = require("axios");
const { Client } = require("pg");

let db;

async function getDataFromAPI(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`Error fetching data from ${url}`, err);
    return null;
  }
}

async function insertIntoDatabase(data, tableName) {
  db = new Client({
    connectionString: "postgresql:///countries",
  });

  db.connect();

    const dbQuery = await db.query(
    `SELECT FROM countries WHERE country_name = 'Albania'`,
  );
  if (dbQuery.rows.length === 0) {
    await db.query(`CREATE DATABASE countries`);
  }


  await db.query(`DROP TABLE IF EXISTS ${tableName}`);
  console.log("Drop Table");

  const countriesTableQeury = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      country_name VARCHAR(255),
      capital VARCHAR(255),
      region VARCHAR(255),
      subregion VARCHAR(255),
      language VARCHAR(255),
      flag VARCHAR(255),
      continent VARCHAR(255),
      population INT
  );
  `;

  await db.query(countriesTableQeury);

  const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255),
      password VARCHAR(255),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255)
  );
  `;

  await db.query(usersTableQuery);

  for (const item of data) {
    const insertQuery = `
      INSERT INTO ${tableName} (country_name, capital, region, subregion, population, language, flag, continent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    let values;

    if (item.capital && item.languages.length === 0) {
      values = [
        item.name.common,
        item.capital[0],
        item.region,
        item.subregion,
        item.population,
        Object.values(item.langauges)[0],
        item.flags.png,
        item.continents[0],
      ];
    } else {
      values = [
        item.name.common,
        "",
        item.region,
        item.subregion,
        item.population,
        "",
        item.flags.png,
        item.continents[0],
      ];
    }

    await db.query(insertQuery, values);
  }

  console.log("Data was succesfully entered");
}

async function main() {
  const url = "https://restcountries.com/v3.1/all";
  const tableName = "countries";

  // await createDatabase();

  const data = await getDataFromAPI(url);

  if (data) {
    await insertIntoDatabase(data, tableName);
  }

  console.log("Successful");
}

main();

db = new Client({
  connectionString: "postgresql:///countries",
});

db.connect();

module.exports = db;
