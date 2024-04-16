import { Router } from "express";
import {
	addTodo,
	deleteTodo,
	getAllTodo,
	insertNewUser,
	updateTodo,
} from "../model/todo.model.js";
const router = Router();

router.post("/new-user", function (req, res, next) {
	const name = req.body.name ?? "";

	if (!name) {
		return res.status(400).json({ message: "name field is required" });
	}

	insertNewUser(name)
		.then((response) => {
			const { message = "", userId = "" } = response;
			res
				.status(200)
				.json({ message: message, data: { name: name, id: userId } });
		})
		.catch(() => res.status(500));
});

router.post("/add-todo", function (req, res, next) {
	const { todo = "", completed = false, userId = "" } = req.body;
	if (!todo || !userId) {
		return res
			.status(400)
			.json({ message: `All fields [todo, userId] are required` });
	}
	addTodo({ todo, completed, userId })
		.then((response) => res.status(200).json(response))
		.catch(() => res.status(500));
});

router.get("/:id", function (req, res, next) {
	const userId = req.params.id;
	getAllTodo(userId)
		.then((response) => res.status(200).json(response))
		.catch(() => res.status(500));
});

router.post("/update", function (req, res, next) {
	const { todoId = "" } = req.query;
	const { completed = false } = req.body;
	if (!todoId) {
		return res.status(400).json({ message: "todoId parameter is required" });
	}
	updateTodo(todoId, completed)
		.then((response) => res.status(200).json(response))
		.catch((error) => {
			if (error === "todo not found") {
				return res.status(404).json({ message: error });
			}
			res.status(500);
		});
});

router.post("/delete", function (req, res, next) {
	const { todoId = "" } = req.body;
	if (!todoId) {
		return res.status(400).json({ message: "todoId parameter is required" });
	}
	deleteTodo(todoId)
		.then((response) => res.status(200).json(response))
		.catch((error) => {
			if (error === "todo not found") {
				return res.status(404).json({ message: error });
			}
			res.status(500);
		});
});

export default router;
