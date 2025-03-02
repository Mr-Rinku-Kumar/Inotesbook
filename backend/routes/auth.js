const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JMT_SECRET = "Rinkuisagoodbo$y";

//ROUTE 1 Create a user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid value").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors,return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
    try {
      //check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry, a user already exists with this email" });
      }
      const salt = await bcrypt.genSalt();
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JMT_SECRET);

      // res.json(user);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error;
      res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE 2 :Authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success=false
    //if there are errors,return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JMT_SECRET);
      success=true
      res.json({success, authToken });
    } catch (error) {
      console.error;
      res.status(500).send("Internal server error!");
    }
  }
);
//ROUTE 3 :Get LoggedIn user details using : POST "/api/auth/getuser". login required
router.post("/getuser",fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error;
    res.status(500).send("Internal server error!");
  }
});

module.exports = router;
