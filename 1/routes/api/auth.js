const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const config = require('config');
const authorisation = require('../../middleware/authorisation');

//Route to login
router.post('/',
  [
    check("email", "Please enter a valid email!").isEmail(),
    check("password", "Password is required").not().isEmpty()
  ],
  async (req, res) => {
    //Form Validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
      //If user exists in our database
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials!" }] });
      }

      //Match the password entered with the hashed user's password we found
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invaid Credentials!" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jsonSecret'), (err, token) => {
        if (err) throw err;
        return res.json({ token: token })
      })
    } catch (err) {
      return res.status(500).send("Server Error");
    }

  })

//Get logged in user
router.get('/', authorisation, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");//Get user id from headers(req.user) 
    res.json(user);//If correct token is present in the headers, we will respond with that user
  } catch (err) {
    return res.status(500).json({ error: { msg: "Server Error" } });
  }
});

module.exports = router;









