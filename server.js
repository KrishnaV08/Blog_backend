const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeblog =
  "Took time off to recuperate and recover my energy. Now back from paradise, rejuvenated and ready to take on the beast again. All eyes on the prize, one more trip to deliver the coup de grace to that other beast in the west. Once that's done, its just a matter of time and protocol until the next step is reached.";

const aboutblog =
  "A blog (a truncation of ) is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page.";

const contactblog =
  "A contact page is one of the main pages on a website. It allows visitors to contact the site owner, or a specific department, such as sales or support team. Usually it will include a contact form so visitors can easily get in touch with the website owners.";

const app = express();

const posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/posts/:postName", function (req, res) {
  const postname = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const title = post.title;
    if (postname == title) {
      res.render("post", { posts: post });
    }
  });
});

app.get("/", function (req, res) {
  res.render("home", { startingblog: homeblog, posts: posts });
});

app.get("/About", function (req, res) {
  res.render("about", { aboutblog: aboutblog });
});

app.get("/Contact", function (req, res) {
  res.render("contact", { contactblog: contactblog });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.PostTitle,
    content: req.body.PostBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server at port 3000");
});
