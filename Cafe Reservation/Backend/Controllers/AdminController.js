const Admin = require('../Models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret
const SECRET_KEY = process.env.JWT_SECRET;

// Admin Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    // ✅ JWT Token Generate
   const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });


    res.status(200).json({ message: 'Login successful', token, admin });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, loginAdmin };
