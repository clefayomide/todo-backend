import connection from "./connection.js";

export const createNewUserTable = () => {
	const sqlQuery = `CREATE TABLE IF NOT EXISTS user (userId varchar(50) not null, name varchar(60) not null, primary key (userId))`;
	return new Promise((resolve, reject) => {
		connection.query(sqlQuery, (err) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve("successful");
		});
	});
};

export const insertNewUser = (name) => {
	const userID = crypto.randomUUID().replaceAll("-", "");
	const sqlQuery = "insert into user (userId, name) values (?, ?)";

	return new Promise((resolve, reject) => {
		connection.query(sqlQuery, [userID, name], (err) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve({ message: "successful", userId: userID });
		});
	});
};

export const addTodo = (data) => {
	const { completed = false, todo = "", userId = "" } = data ?? {};
	const todoId = crypto.randomUUID().replaceAll("-", "");

	const sqlQuery =
		"insert into todo (todoId, userId, todo, completed) values (?, ?, ?, ?)";

	return new Promise(async (resolve, reject) => {
		connection.query(sqlQuery, [todoId, userId, todo, completed], (err) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve({ message: "successful", data: { todoId, todo, completed } });
		});
	});
};

export const getAllTodo = (userId) => {
	const sqlQuery = "select todoId, completed, todo from todo where userId = ?";
	return new Promise((resolve, reject) => {
		connection.query(sqlQuery, [userId], (err, results, fields) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			resolve({ message: "successful", data: results });
		});
	});
};

export const updateTodo = (todoId = "", completed = false) => {
	const sqlQuery = "update todo set completed = ? where todoId = ?";
	return new Promise((resolve, reject) => {
		connection.query(sqlQuery, [completed, todoId], (err, result) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			if (result.affectedRows < 1) {
				return reject(new Error("todo not found"));
			}
			resolve({ message: "successful" });
		});
	});
};

export const deleteTodo = (todoId) => {
	const sqlQuery = "delete from todo where todoId = ?;";
	return new Promise((resolve, reject) => {
		connection.query(sqlQuery, [todoId], (err, result) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			if (result.affectedRows < 1) {
				return reject(new Error("todo not found"));
			}
			resolve({ message: "successful" });
		});
	});
};
