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

  const tableQeury = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      country_name VARCHAR(255),
      capital VARCHAR(255),
      region VARCHAR(255),
      subregion VARCHAR(255),
      population INT
  );
  `;

  await db.query(tableQeury);

  for (const item of data) {
    const insertQuery = `
      INSERT INTO ${tableName} (country_name, capital, region, subregion, population)
      VALUES ($1, $2, $3, $4, $5)
    `;

    let values;

    if (item.capital) {
      values = [
        item.name.common,
        item.capital[0],
        item.region,
        item.subregion,
        item.population,
      ];
    } else {
      values = [
        item.name.common,
        null,
        item.region,
        item.subregion,
        item.population,
      ];
    }

    await db.query(insertQuery, values);
  }

  console.log("Data was succesfully entered");
}

async function main() {
  const url = "https://restcountries.com/v3.1/all";
  const tableName = "countries";

  const data = await getDataFromAPI(url);

  if (data) {
    await insertIntoDatabase(data, tableName);
  }
}

main();

module.exports = db;
