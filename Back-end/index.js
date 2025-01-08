
const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
 
app.get("/", (req, res) => {
  res.send("Hello World");
});
 
app.get("/movies", (req, res) => {
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  res.json(movies);
});
 
app.get("/movies/details", (req, res) => {
  const { name } = req.query;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const selectedItem = movies.find((movie) => movie.name == name);
  res.json({ message: selectedItem });
});
 
app.get("/movies/create", (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  movies.push({ id: Date.now(), name });
  const movieString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", movieString);
  res.json({ message: "created" });
});
 
app.get("/movies/update", (req, res) => {
  const { name } = req.query;
  const { newName } = req.query;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  movies.find((movie) => movie.name == name).name = newName;
  const movieString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", movieString);
  res.json({ message: "Updated" });
});
 
app.get("/movies/delete", (req, res) => {
  const { name } = req.query;
  const data = fs.readFileSync("data/movies.json", "utf8");
  const movies = JSON.parse(data);
  const selectedItem = movies.findIndex((movie) => movie.name == name);
  movies.splice(selectedItem, 1);
  const movieString = JSON.stringify(movies, null, 4);
  fs.writeFileSync("data/movies.json", movieString);
  res.json({ message: "Deleted" });
});
 
app.listen(port, () => {
  console.log(`Example app listening on ${port} `);
});