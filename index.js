const { json } = require("body-parser");
const express = require("express");
const { readFileSync } = require("fs");
const fs = require("node.fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("hello")
});

app.get("/movies", (req, res)=> {
    const data = fs.readFileSync("data/movies.json", "UTf-8");
    const movies = JSON.parse(data);
    res.json(movies);
});

app.get("/movies/create", (req, res)=> {
    console.log(req.query)
    
    const name = req.query.name;


    const data = fs.readFileSync("data/movies.json", "UTf-8");
    const movies = JSON.parse(data);

    movies.push({
        id: Date.now(),
        name
    })

    const movieString = JSON.stringify(movies, null, 4);
    fs.writefilesync("data/movies.json", movieString);

    res.json({message: "success"})
});

app.listen(port, ()=> {
    console.log(`example app listining on port ${port}`);
})