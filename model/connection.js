import "dotenv/config";
import { MongoClient } from "mongodb";
const connectionString = process.env.TODOAPP_MONGODB_CON_URL || "";
const client = new MongoClient(connectionString);
let conn;
try {
	conn = await client.connect();
} catch (e) {
	console.error(e);
}
const db = conn.db(process.env.TODOAPP_MONGODB_DBNAME);
export default db.collection("users");
