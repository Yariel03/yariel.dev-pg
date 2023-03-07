// cspell:disable
const { consoleLog: clox, Color: col } = require("yariel.dev-colors");
const { Pool } = require("pg");
require("dotenv").config();

let USER = process.env.DB_USER;
let HOST = process.env.DB_HOST;
let DATABASE = process.env.DB_NAME;
let PASS = process.env.DB_PASSWORD;
let PORT = process.env.DB_PORT;
let idleTimeoutMillis = process.env.idleTimeoutMillis || 30000;
let connectionTimeoutMillis = process.env.connectionTimeoutMillis || 3000;
let MAX = process.env.MAX_POOL || 20;

const sqlConfig = {
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASS,
  port: PORT,
  max: 20,
  idleTimeoutMillis: idleTimeoutMillis,
  connectionTimeoutMillis: connectionTimeoutMillis,
};

const db = new Pool(sqlConfig); //new sql.Pool(sqlConfig)

(async () => {
  try {
    await db.connect();
    clox(col.Blue, `********************************************************`);
    clox(col.Check, `Conexion exitosa a la base de datos ${DATABASE}`);
    clox(col.Blue, `********************************************************`);
  } catch (err) {
    clox(col.Error, `Error conectando a la base de datos ${DATABASE}, ${err}`);
    await db.end();
  }
})();

module.exports = { db };
