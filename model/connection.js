import "dotenv/config";
import mysql from "mysql";
const connection = mysql.createConnection({
	host: process.env.TODOAPP_DB_HOST,
	user: process.env.TODOAPP_DB_USER,
	password: process.env.TODOAPP_DB_PWD,
	database: process.env.TODOAPP_DB,
});

connection.connect();

export default connection;
