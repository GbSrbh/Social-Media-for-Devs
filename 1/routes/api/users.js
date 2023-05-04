const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');//Express validator
const gravatar = require('gravatar');//Gravatar for user profile
const bcryptjs = require('bcryptjs');//bcryptjs for password encryption

const User = require('./../../models/User');//Mongoose User Model

const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',
  [
    check('name', 'Name field is required so, please enter a name.').not().isEmpty(),
    check('email', "Please include a valid email.").isEmail(),
    check('password', "Password length should be at least 6 words").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let { name, email, password } = req.body;

    try {
      //See if user already exists
      let user = await User.findOne({ email: email });//Search in database, if someone has same email.
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists with the same Email." }] })
      }
      //Get user gravatar
      const profileAvatar = gravatar.url(email, {
        s: '200',//Size of the profile
        r: 'pg',//Naked profile not allowed
        d: 'mm'//Default user icon
      });
      //Encrypt password
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password, salt);//Just learn this encryption code bro.

      user = new User({//creating new user to save in database
        name: name,
        email: email,
        password: password,
        avatar: profileAvatar
      });
      await user.save();//This will save this user in our database.

      //Return JsonWebToken

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jsonSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      })

    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }

  });

module.exports = router;



