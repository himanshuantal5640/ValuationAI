import express from 'express';
import { db, verifyPassword } from '../services/db.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  try {
    const newUser = db.users.create(email, password);
    return res.status(201).json({ 
      message: "Registration successful.", 
      user: newUser 
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = db.users.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isValid = verifyPassword(password, user.salt, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    return res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
