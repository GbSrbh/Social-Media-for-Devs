const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const Profile = require('../../models/Profile');
const authorisation = require('../../middleware/authorisation');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//Access(view) profile through this route after passing the token(this profile is not login sign up, it's like you can create youtube channel after logging in your youtube account)
router.get('/me', authorisation, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user }).populate('user', ['name', 'avatar'], 'user');
    if (!profile) {
      return res.status(400).json({ msg: "No Profile Found!!" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: "Server Error!" });
  }
});
//Create profile through this route. Still you need to be logged in your account to create profile thus we have authorisation.
router.post('/',
  [authorisation,
    [
      check('status', "Status is Required!").not().isEmpty(),//Only checking two fields.
      check('skills', "Skills are Required!").not().isEmpty(),//because {required: true} for them
      //These two fields are must.
    ]
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    let profileDetails = {};
    profileDetails.user = req.user;//We inserted id in req.user in authorisation file.

    if (company) { profileDetails.company = company; }
    if (website) { profileDetails.website = website; }
    if (location) { profileDetails.location = location; }
    if (status) { profileDetails.status = status; }
    if (skills) {
      profileDetails.skills = skills.split(',');//Convert entered skills in string form to array form.
    }
    if (bio) { profileDetails.bio = bio; }
    if (githubusername) { profileDetails.githubusername = githubusername; }

    let socials = {};

    if (youtube) { socials.youtube = youtube };
    if (twitter) { socials.twitter = twitter };
    if (facebook) { socials.facebook = facebook };
    if (linkedin) { socials.linkedin = linkedin };
    if (instagram) { socials.instagram = instagram };

    profileDetails.social = socials;

    try {
      let profile = await Profile.findOne({ user: req.user });
      if (profile) {//If profile already exists, update the profile.
        //update
        profile = await Profile.findOneAndUpdate({ user: req.user }, { $set: profileDetails }, { new: true });//Find the profile whoose user filed is equal to req.user. And set that profile to "profileDetails", we created.
        await profile.save();
        res.json(profile);
      }
      //If profile does not exist, Create new one.
      profile = new Profile(profileDetails);
      await profile.save();
      res.json(profile);
    } catch (err) {
      return res.status(500).send("Server Error!");
    }
  })
//Route to access all the profiles present in our database.
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'], 'user');
    if (profiles.isEmpty) {
      res.json({ 'msg': "No Profiles Available!" });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

})
//Route to access profile from user_id in url
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'], 'user');
    if (!profile) {
      res.status(400).json({ 'msg': 'No Profile Found!' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      res.status(400).json({ 'msg': 'No Profile Found!' })
    } else {
      res.status(500).send("Server Error!");
    }
  }
})

//Route to delete the User, his profile, and his posts from our database
router.delete('/', authorisation, async (req, res) => {
  try {
    //Delete User
    await User.findOneAndRemove({ id: req.user });
    //Delete User Profile
    await Profile.findOneAndRemove({ user: req.user });
    //Delete User Posts: Yet to be done

    res.json({ msg: 'User Deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
})

//Route to add experience field to the profile
router.put('/experience',
  [authorisation,
    [
      check('title', "Title is required!!").not().isEmpty(),
      check('company', "Company is required!!").not().isEmpty(),
      check('from', "From date is required!!").not().isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let profileExperience = {};
      const { title, company, location, from, to, current, description } = req.body;

      profileExperience.title = title;
      profileExperience.company = company;
      profileExperience.location = location;
      profileExperience.from = from;
      profileExperience.to = to;
      profileExperience.current = current;
      profileExperience.description = description;

      try {
        let profile = await Profile.findOne({ user: req.user });
        if (!profile) {
          res.status(400).json({ msg: "No Profle Found!" });
        }
        profile.experience.unshift(profileExperience);//Because one profile can have more than one experience (its array)
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Server Error!" });
      }
    }])

//Route to delete experience
router.delete('/experience/:exp_id', authorisation, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    const toBeRemovedIndex = profile.experience.map(function (item) { return (item.id) }).indexOf(req.params.exp_id);
    profile.experience.splice(toBeRemovedIndex, 1);//Remove the value at this index from experience array.
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error!!');
  }
})

//Route to add education field to profile
router.put('/education', [authorisation, [
  check('school', "School field is required!!").not().isEmpty(),
  check('degree', "Degree field is required!!").not().isEmpty(),
  check('fieldofstudy', "Field of study is required!!").not().isEmpty(),
  check('from', "From date is required!!").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  const education = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      res.status(400).json({ msg: "No Profile Found!!" });
    }
    profile.education.unshift(education);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error!!" });
  }
}])

//Route to delete from education array
router.delete('/education/:ed_id', authorisation, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    const toBeRemovedIndex = profile.education.map(function (item) { return (item.id) }).indexOf(req.params.ed_id);
    profile.education.splice(toBeRemovedIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error!!" });
  }
})

//Route to get github repos by username
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
      method: "GET",
      headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error(error.message);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github Profile Found!!" })
      }
      res.json(JSON.parse(body));
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
})

module.exports = router;



