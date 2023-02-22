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
const { db: conn } = require("./setting/index");
// cspell:disable
const exec = (SQL, OK, msgVacio, msgError = null) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let response = {};
    try {
        const res = yield conn.query(SQL);
        response = {
            count: res.rowCount,
            message: res.rowCount > 0 ? OK : msgVacio,
            data: (_a = res.rows) !== null && _a !== void 0 ? _a : [],
        };
    }
    catch (error) {
        response = {
            count: -1,
            message: ` ${msgError !== null && msgError !== void 0 ? msgError : error}`,
        };
    }
    finally {
        return response;
    }
});
module.exports = { exec };
