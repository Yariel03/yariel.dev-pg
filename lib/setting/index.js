"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// cspell:disable
const { consoleLog: cloxxx, Color: colorxxx } = require("yariel.dev-colors");
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.connect();
        cloxxx(colorxxx.Check, `Conexion exitosa a la base de datos ${DATABASE}`);
    }
    catch (err) {
        cloxxx(colorxxx.Error, `Error conectando a la base de datos ${DATABASE}, ${err}`);
        yield db.end();
    }
}))();
module.exports = { db };
