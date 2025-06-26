const express = require("express");
const User = require("../models/Note");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const b1 = require("bcryptjs");

route.post(
  "/",
  [
    body("name").isLength({ min: 6 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res.status(404).json({ error: "user already exits" });
      }
      const salt = await b1.genSalt(6);
      const spass = await b1.hash(req.body.password, salt);
      console.log(spass);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: spass,
      });
      res.json(user);
    } catch (error) {
      console.error(error.massage);
      res.status(600).send("Some Error occured");
    }
    /*else
   {
   return res.send("success");
   }*/
  }
);

module.exports = route;
