const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isValidEmail, isStrongPassword } = require('../utils/validators');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/* 🔥 PREDEFINED OFFICER EMAILS */
const officerEmails = {
  "road@gmail.com": "Road",
  "water@gmail.com": "Water",
  "electricity@gmail.com": "Electricity",
  "sanitation@gmail.com": "Sanitation",
  "railway@gmail.com": "Railway"
};


/* =======================
   SIGNUP (AUTO ROLE)
======================= */

router.post('/signup', async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    if (!isValidEmail(email))
      return res.status(400).json({ message: 'Invalid email' });

    if (!isStrongPassword(password))
      return res.status(400).json({
        message: 'Password too weak (min 6 chars)'
      });

    const existing = await User.findOne({ email });

    if (existing)
      return res.status(409).json({
        message: 'Email already in use'
      });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    /* 🔥 AUTO DETECT ROLE */

    let role = "citizen";
    let department = null;

    if (officerEmails[email]) {
      role = "officer";
      department = officerEmails[email];
    }

    const user = new User({
      name,
      email,
      passwordHash,
      role,
      department
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: 'Server error'
    });

  }

});


/* =======================
   LOGIN
======================= */

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: 'Email and password required'
      });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: 'Invalid credentials'
      });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
      return res.status(401).json({
        message: 'Invalid credentials'
      });

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: 'Server error'
    });

  }

});


/* =======================
   GET CURRENT USER
======================= */

router.get('/me', authMiddleware, async (req, res) => {

  try {

    const user = await User
      .findById(req.userId)
      .select('-passwordHash');

    if (!user)
      return res.status(404).json({
        message: 'User not found'
      });

    return res.json({ user });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: 'Server error'
    });

  }

});

module.exports = router;