import createError from "http-errors";
import express, { json, urlencoded, static as ExpressStatic } from "express";
import { join, dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import indexRouter from "./controller/index.js";
import cors from "cors";

const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const __currentModulePath = fileURLToPath(import.meta.url);

const app = express();

// view engine setup
app.set("views", join(dirname(__currentModulePath), "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(ExpressStatic(join(dirname(__currentModulePath), "public")));

app.use("/todo", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(() => console.log("App is running on port 8000"));

export default app;
