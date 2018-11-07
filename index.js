const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "soccer-twit"
});
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});
app.use(express.json());

var port = 5000;
app.use(cors());
app.get("/", (req, res) => {
  res.json({
    message: "hello"
  });
});
function isValidTweet(data) {
  return (
    data.name &&
    data.name.toString().trim() != "" &&
    data.tweet &&
    data.tweet.toString().trim() != ""
  );
}
app.post("/post", (req, res) => {
  if (isValidTweet(req.body)) {
    const data = {
      name: req.body.name.toString(),
      tweet: req.body.tweet.toString()
    };

    //querying database
    connection.query(
      "INSERT INTO twittable SET ?",
      data,
      (error, results, fields) => {
        if (error) throw error;
        res.json({ status: 200, error: null, response: results });
      }
    );
    console.log(data);
  } else {
    res.status(422);
    res.json({
      error: "error inserting"
    });
  }
});
app.get("/twit", function(req, res) {
  //querying database
  connection.query("SELECT * FROM twittable", (error, results, fields) => {
    if (error) throw error;
    //res.send(JSON.stringify({ status: 200, error: null, response: results }));
    res.json(results);
  });
});
app.listen(port, () => {
  console.log("Listening on port 5000");
});
