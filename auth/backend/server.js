const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/auth_demo')
  .then(() => console.log('✅ Connected to MongoDB'));

// 2. User Schema & Model
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// 3. Signup (Hash password -> Save)
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists or invalid input' });
  }
});

// 4. Login (Check user -> Compare password -> Return JWT)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Return token
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
    res.json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 5. Start Server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
