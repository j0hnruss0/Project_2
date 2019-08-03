require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PW,
    database: "superhero_draft_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: process.env.DB_PW,
    database: "superhero_draft_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    username: "root",
    password: process.env.DB_PW,
    database: "superhero_draft_db",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
