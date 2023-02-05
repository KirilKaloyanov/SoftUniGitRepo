const homeController = require("express").Router();

//TODO replace with real controller by assignment

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page - Crypto Web",
    user: req.user,
  });
});

homeController.get("/error", (req, res) => {
  res.render("error", {
    title: "404 Page",
  });
});

module.exports = homeController;
