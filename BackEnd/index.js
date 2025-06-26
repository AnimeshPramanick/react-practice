const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const User = require("./models/Note");
connectToMongo();
const { body, validationResult } = require("express-validator");
const b1 = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_str = "React JS";

const app = express();
const port = 3001;
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

// -----------Register----------------

app.post("/register", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).json({ error: "user already exist" });
    }
    const salt = await b1.genSalt(6);
    const spass = await b1.hash(req.body.password, salt);
    console.log(spass);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: spass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, jwt_str);
    //res.json(authtoken)
    res.status(200).send({ x: "success" });

    //res.json(user)
  } catch (error) {
    console.error(error.massage);
    res.status(600).send("Some Error occured");
  }
});

// -----------Login----------------

app.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(406).json({ error: "user not exist" });
      }
      const passcom = await b1.compare(password, user.password);
      //console.log(b1.decodeBase64());
      console.log("Page Password = " + password);
      console.log("DB Password = " + user.password);
      if (!passcom) {
        return res.status(406).json({ error: "password miss match" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_str);
      res.json("Success");
    } catch (error) {
      console.error(error.massage);
      res.status(700).send("Some Error occured");
    }
  }
);

app.get("/fetch-detail", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteuser", async (req, res) => {
  const { id } = req.body;
  //console.log(userid);
  try {
    const delUser = await User.findOne({ _id: id });
    console.log(delUser);
    const demo = await User.deleteOne({ _id: id });
    //console.log(res.json());
    if (demo) console.log("Deleted Successful!!!" + demo);
    else console.log("Deleted Unsuccessful!!!" + demo);
    res.status(200).send({ x: "Delete" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/updateuser", async (req, res) => {
  const { id, name, email, password } = req.body;
  let update = {};
  if (name && name !== "") update.name = name;
  if (email && email !== "") update.email = email;
  if (password && password !== "") {
    const salt = await b1.genSalt(6);
    const spass = await b1.hash(password, salt);
    update.password = spass;
  }
  console.log(id);
  try {
    const demo = await User.updateOne({ _id: id }, { $set: update });
    console.log("success");
    res.status(200).send({ x: "Updated" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
