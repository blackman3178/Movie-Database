const express = require("express");

const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",

        user: "root",

        password: "one2three",

        database: "movies_db"
    },
    console.log("connected to the movies database!!")
);

// add a movie to db
app.post("/api/add-movie", ({ body }, res) => {
    const sql = `INSERT INTO movie_names (movie_name) VALUES (?)`;
    const params = [body.movie_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: "Success!",
            data: body
        });
    });
});

//read all movies 
app.get("/api/movies", (req, res) => {
    const sql = "SELECT * FROM movie_names";

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json ({ error: err.message});
            return;
        }
        res.json ({
            message: "Success!",
            data: rows
        });
    });
});

// if a NOT FOUND request is used
app.use ((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});