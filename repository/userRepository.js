const { poolPromise, sql } = require("../config/db");

async function insertUser(name) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("name", sql.VarChar(100), name)
      .query("INSERT INTO Users (Name) OUTPUT INSERTED.Id VALUES (@name)");
    return result.recordset[0].Id;
  } catch (error) {
    console.error("Error in insertUser: ", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, userId)
      .query("SELECT Id, Name FROM Users WHERE Id = @id");
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset[0];
  } catch (error) {
    console.error("Error in getUserById: ", error);
    throw error;
  }
}

module.exports = {
  insertUser,
  getUserById
};
