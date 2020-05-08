//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const mainContent = "";

const dynamic1 ="COVID-19 landed in America as soon as Jan 21, 2020 starting with a single case in Snohomish Washington, and weeks following it with cases landing in different parts of the country, and little after… a sudden burst of cases. But what can we take away from the graph? We saw that beginning, that bloom, and also a slow down of cases around the end of March and beginning of April, which can be due to the fact of localized or national lockdown taking place. But from the graph we can also see that locations where most cases occur also happen to be places that are densely populated. Does this mean population density is directly related to case count?";

const dynamic2 = "Well, population density is definitely not the only factor that affects case counts, the amount of testing each state has done can totally screw the statistic. Since giving out more tests can mean more of the population will be tested for positive, so we made a graph to see how each state is doing with the testing. And we see that more testing doesn’t totally make for more cases, as with the case of NY and LA.";

const static = "And here we see a graph showing the situation in CA. Similar to the visual showing map of the US, there is indeed an increase or a spike in cases during the end of March and beginning of April. And due to lockdown protocol we can see that there is still little spike every weekend (can be explained due to the need of essential activity like purchasing food) but overall the situation has stayed the same and cases are not increasing exponentially. Showing that CA is not doing terrible as long as we can keep persevering through the lockdown.";

const thanks ="This class enabled us to explore from designing and implementing to deploying dynamic visualization. We would like to thank Professor Baynes for teaching and supporting us in such a difficult time. Thank you all, hope everyone stays safe.";

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

app.get("/interactive1", function(req, res){
  res.sendFile(__dirname + "/interactive1.html");
});

app.get("/interactive2", function(req, res){
  res.sendFile(__dirname + "/interactive2.html");
});

app.get("/static", function(req, res){
  res.sendFile(__dirname + "/static.html");
});

app.get("/writeup", function(req, res){
  res.render("writeup", {dynamic1: dynamic1,
    dynamic2: dynamic2,
    static: static,
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
