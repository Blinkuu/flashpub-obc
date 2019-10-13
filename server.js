require("dotenv").config()
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const app = express();

const firebaseInit = require("./config/firebase_config");
firebaseInit();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/secret/:id", async (req, res) => {
  const usersRef = firebase.database().ref("users");
  await usersRef.once("value", (data) => {
    res.send(data);
  });
})

app.post("/api/secret", async (req, res) => {
  const { uuid, content } = req.body.data;

  const usersRef = firebase.database().ref(`users/${uuid}/content`);
  await usersRef.set(content);

  res.send(content);
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
