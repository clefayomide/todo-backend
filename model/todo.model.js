import connection from "./connection.js";

export const insertNewUser = (name) =>
	new Promise((resolve, reject) => {
		const userId = crypto.randomUUID().replaceAll("-", "");
		connection
			.insertOne({
				userId,
				name: name,
			})

			.then(() => {
				const responseData = { message: "User created successfully", userId };
				resolve(responseData);
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});

export const addTodo = (data) => {
	const { completed = false, todo = "", userId = "" } = data ?? {};
	const todoId = crypto.randomUUID().replaceAll("-", "");

	return new Promise(async (resolve, reject) => {
		connection
			.updateOne(
				{ userId: userId },
				{ $push: { todos: { todo, completed, todoId } } }
			)
			.then(() =>
				resolve({ message: "Successful", data: { todo, completed, todoId } })
			)
			.catch((error) => {
				reject(error);
			});
	});
};

export const getAllTodo = (userId) => {
	return new Promise((resolve, reject) => {
		connection
			.findOne({ userId })
			.then((result) => {
				resolve({ message: "Successful", data: result.todos });
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateTodo = (todoId = "", completed = false) => {
	return new Promise((resolve, reject) => {
		connection
			.updateOne(
				{ "todos.todoId": todoId },
				{ $set: { "todos.$.completed": completed } }
			)
			.then(() => {
				resolve({ message: "Successful" });
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const deleteTodo = (todoId) => {
	return new Promise((resolve, reject) => {
		connection
			.updateOne({}, { $pull: { todos: { todoId: todoId } } })
			.then(() => {
				resolve({ message: "Successful" });
			})
			.catch((error) => {
				reject(error);
			});
	});
};
