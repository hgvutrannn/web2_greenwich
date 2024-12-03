const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Secret key for signing JWT (store securely in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    // Hash the password with bcrypt
    const saltRounds = 10; // The cost factor for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token valid for 1 hour
    );
    // Authentication successful
    res.status(200).json({ token, message: "Login successful!", user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error: error.message });
  }
};

// Fetch the authenticated user's profile
exports.getProfile = async (req, res) => {
  try {
    // The `req.user` is set by the auth middleware (decoded JWT)
    const userId = req.user.id;

    // Find the user by ID (exclude sensitive fields like password)
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Update only allowed fields (e.g., name, password)
    const { username, password } = req.body;
    
    // Build the update object
    const updates = {};
    if (username) updates.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10); // Use bcrypt for password hashing
      updates.password = await bcrypt.hash(password, salt);
    }
    console.log(updates)
    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
