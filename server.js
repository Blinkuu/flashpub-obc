require("dotenv").config()
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const app = express();

const firebaseInit = require("./config/firebase_config");
firebaseInit();

const port = process.env.PORT || 5000;
// const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/secret", async (req, res) => {
  console.log(req.body);
  const usersRef = firebase.database().ref("users");
  await usersRef.once("value", (data) => {
    res.send(data);
  });
  res.send("Failed to fetch data!");
})

app.post("/api/secret", async (req, res) => {
  const { uuid, content } = req.body.data;
  console.log(uuid);
  console.log(content);
  
  var postData = {
    content: content,
  };

  const usersRef = firebase.database().ref("users")
  usersRef.child(uuid).set(postData);
  res.send("content");
})

app.post("/api/auth", async (req, res) => {
  const { name, email, login } = req.body.userData;

  const usersRef = firebase.database().ref("users");
  await usersRef.set({
    [login.uuid]: {
      name: name,
      email: email,
      content: "Vim is awesome! :)"
    }
  });

  res.send({uuid: login.uuid});
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
