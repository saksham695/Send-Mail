const path = require("path");
const express = require("express");
const app = express();

const fortunes = ["one", "two", "three", "four", "five"];
//Define paths for Express config
const viewsPath = path.join(__dirname, "./views");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use((req, res, next) => {
  console.log(req.method, " ", req.path, " ", req.ip);
  next();
});

let time;
app.get(
  "/",
  (req, res, next) => {
    let date_ob = new Date();

    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();
    time = hours + ":" + minutes + ":" + seconds;
    console.log(time);
    // next();
  },
  (req, res) => {
    res.render("home", {
      time: time,
    });
  }
);
app.get("/about", (req, res) => {
  var fortuneRandom = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: fortuneRandom });
});

app.get("/json", function (req, res) {
  res.send({ message: "Hello world" });
});

// custom 404 page
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(404);
  res.send("404");
});

//custom 500 page
app.use("/500", function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.send("500");
});

app.get(
  "/user/:id",
  function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  function (req, res, next) {
    // send a regular response
    res.send("regular");
  }
);

// handler for the /user/:id path, which sends a special response
app.get("/user/:id", function (req, res, next) {
  res.send("special");
});

app.listen(3001, () => {
  console.log("Server is up on port 3000");
});
