const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Penisbutt123!",
	database: "students",
});

app.post("/add_user", (req, res) => {
	sql =
		"INSERT INTO student_details (  name , email , age , gender ) VALUES (?, ?, ?, ?)";
	const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res
				.status(500)
				.json({ message: "Something unexpected had occured oopsie" + err });
		}
		console.log("student added", result);
		return res.json({ success: "Student added successfully" });
	});
});

app.post("/edit_user/:id", (req, res) => {
	const id = req.params.id;
	sql = "UPDATE student_details SET (`name` =?, `email` =?,`age` =?, `gender` =?) WHERE `id`= ? ";
	const values = [req.body.name, req.body.email, req.body.age, req.body.gender,id];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res
				.status(500)
				.json({ message: "Something unexpected had occured oopsie" + err });
		}
		console.log("student added", result);
		return res.json({ success: "Student added successfully" });
	});
});

app.get("/students", (req, res) => {
	const sql = "SELECT * FROM student_details";
	db.query(sql, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ message: "Server Error get stuff" });
		}
		console.log("data fetched", result);
		return res.json(result);
	});
});

app.get("/get_student/:id", (req, res) => {
	const id = req.params.id;
	const sql = "SELECT * FROM student_details WHERE `id` = ?";
	db.query(sql, [id], (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res.status(500).json({ message: "Server Error get stuff" });
		}
		console.log("data fetched", result);
		return res.json(result);
	});
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	sql = "DELETE FROM student_details WHERE `id`= ? ";
	const values = [id];
	db.query(sql, values, (err, result) => {
		if (err) {
			console.error("error inserting data", err);
			return res
				.status(500)
				.json({ message: "Something unexpected had occured oopsie" + err });
		}
		console.log("student added", result);
		return res.json({ success: "Student added successfully" });
	});
});

app.listen(port, () => {
	console.log("listening on http://localhost:5000");
});
