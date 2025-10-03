import mysql from "mysql2/promise"
   
    //    const pool = mysql.createPool({
    //             host: process.env.HOST_NAME,
    //             user: process.env.USER_NAME,
    //             password: process.env.DB_PASSWORD,
    //             database: process.env.DB_NAME,
    //             port: process.env.DB_PORT,
    //             waitForConnections: true, 
    //             connectionLimit: 10,     
    //             queueLimit: 0  
    //         })
        const pool = mysql.createPool({
    host: "127.0.0.1",       // or "localhost"
    user: "root",            // your MySQL username
    password: "mysqlhuzi$$2536", // replace with your actual password
    database: "student_attendance",  // database you created
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;