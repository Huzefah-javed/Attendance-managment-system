import pool from "./pool.js";

export async function loginStorageSession(ID, role){
    await pool.query("INSERT INTO LOGINSESSION (ROLE, USER_ID) VALUES(?,?)", [role, ID])
}

export async function getSessionalData(id){
   const [rows] = await pool.query("SELECT * FROM LOGINSESSION WHERE ID = ? ", [id])
   return rows[0];
}