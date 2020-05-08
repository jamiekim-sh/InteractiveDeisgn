//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const mainContent ="";

const writeupContent = "We choose to do a bar chart with added tooltip and mouse over function for interaction. We found that information can be easily read with the bar chart. In the design we wanted to show the ratio between the amount of people tested and amount of positives tested per population of 100,000. To make it expressible and easy to read, data positive converted to 100k. <- how this paragraph could be a lot shorter Tina🤔"
const writeupContent2 ="Different interaction tool, zoom is added  ";
const thanks ="This class enabled us to explore from designing and implementing to deploying dynamic visualization. We would like to thank Professor Baynes for teaching and supporting us in such a difficult time. Thank you all, hope you guys are well.";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

let posts = [];


app.get("/test", function(req, res){
  res.sendFile(__dirname + "/test.html");
});



// app.get("/", function(req, res){
//   res.render("main", {mainContent: mainContent});
// });

app.get("/", function(req, res){
  res.sendFile(__dirname + "/covid19.html");
});

app.get("/static", function(req, res){
  res.sendFile(__dirname + "/static.html");
});

app.get("/interactive1", function(req, res){
  res.sendFile(__dirname + "/interactive1.html");
});

app.get("/interactive2", function(req, res){
  res.sendFile(__dirname + "/interactive2.html");
});

app.get("/writeup", function(req, res){
  res.render("writeup", {writeupContent: writeupContent,
    writeupContent2: writeupContent2,
    thanks:thanks
  });
});




let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("server successfully has started");
});
