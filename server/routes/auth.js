const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 🆕 ADDED: Real-time availability check endpoint for your frontend debounced check
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (user) {
      return res.status(409).json({ success: false, message: 'Email already taken.' });
    }
    return res.status(200).json({ success: true, message: 'Email is available!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server check error' });
  }
});

// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    // 💡 Added 'name' fallback since schema requires it but UI doesn't have a field for it yet
    const { email, password, role } = req.body;
    const cleanEmail = email.trim().toLowerCase();

    let user = await User.findOne({ email: cleanEmail });
    if (user) return res.status(400).json({ success: false, message: 'User already registered' });

    // Using the email prefix as a placeholder name since 'name' is required in your schema
    const placeholderName = cleanEmail.split('@')[0];

    user = await User.create({ 
      name: placeholderName, 
      email: cleanEmail, 
      password, 
      role: role || 'Operator' 
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error during SignUp', error: error.message });
  }
});

// @route   POST /api/auth/login  <-- 🔄 CHANGED from /signin to /login to match frontend fetch
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // 🔄 Matches the lowercase 'password' key sent below

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid Email or Password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid Email or Password' });

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error during SignIn', error: error.message });
  }
});

module.exports = router;