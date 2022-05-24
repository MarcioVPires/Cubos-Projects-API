const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "T1carrak4t@",
  database: "all_cubos_projects",
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = { query };
