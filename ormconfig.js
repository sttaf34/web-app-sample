module.exports = {
  type: "mysql",
  charset: "utf8mb4",
  host: process.env.MYSQL_HOST || "db",
  port: 3306,
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "sample",
  synchronize: false,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers"
  }
}
