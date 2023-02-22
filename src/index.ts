const { db: conn } = require("./setting/index");
// cspell:disable
const exec = async (
  SQL: string,
  OK: string,
  msgVacio: string,
  msgError = null
) => {
  let response: any = {};
  try {
    const res = await conn.query(SQL);
    response = {
      count: res.rowCount,
      message: res.rowCount > 0 ? OK : msgVacio,
      data: res.rows ?? [],
    };
  } catch (error) {
    response = {
      count: -1,
      message: ` ${msgError ?? error}`,
    };
  } finally {
    return response;
  }
};

module.exports = { exec };
