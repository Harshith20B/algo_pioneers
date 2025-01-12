const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        scores: user.scores
      }
    });
  } catch (error) {
    console.error('Error in /register:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        scores: user.scores
      }
    });
  } catch (error) {
    console.error('Error in /login:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/update-score', async (req, res) => {
  try {
    const { userId, game, score } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the score for the specified game
    user.scores[game] = Math.max(user.scores[game] || 0, score);
    await user.save();

    res.json({ scores: user.scores });
  } catch (error) {
    console.error('Error in /update-score:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
