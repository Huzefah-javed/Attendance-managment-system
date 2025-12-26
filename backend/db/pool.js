import mysql from "mysql2/promise"
   
       const pool = mysql.createPool({
                host: process.env.HOST_NAME,
                user: process.env.USER_NAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                waitForConnections: true, 
                connectionLimit: 10,     
                queueLimit: 0  
            })
       

export default pool;