require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEVELOPMENT_DB,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
<<<<<<< HEAD
    database: process.env.DB_NAME,
    host: process.env.host,
    use_env_variable: 'DATABASE_URL',
=======
    database: process.env.PRODUCTION_DB,
    host: process.env.DATABASE_PRODUCTION_HOST,
    port: process.env.DATABASE_PORT,
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
    dialect: 'postgres',
    logging: null,
  }
};
