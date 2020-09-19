require('dotenv').config()

const dbConfig = {
  development: {
    username: "root",
    password: "root",
    database: "db_imovel_dev",
    host: "localhost",
    port: "3306",
    dialect: "postgres",
    timezoze: "-03:00"
  },
  test: {
    storage: "./__tests__/database.sqlite",
    dialect: "sqlite",
    logging: false
  },
  production: {
    username: "root",
    password: "root",
    database: "db_imovel_dev",
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    timezoze: "-03:00"
  }
}

module.exports = {
  ...dbConfig[process.env.NODE_ENV || "development"],
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true
  }
}

