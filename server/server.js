require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Brand = require('./models/Brand');
const CarModel = require('./models/CarModel');
const ModelDetail = require('./models/ModelDetail');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://prizviseima35_db_user:C1givOUtwQ8r9UEz@cluster0.falwcgt.mongodb.net/?appName=Cluster0';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-it';

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (brand) res.json(brand);
    else res.status(404).json({ error: 'Brand not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/models', async (req, res) => {
  try {
    const { brandId } = req.query;
    const query = brandId ? { brandId } : {};
    const models = await CarModel.find(query);
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/modelDetails/:id', async (req, res) => {
  try {
    const details = await ModelDetail.findById(req.params.id);
    if (details) {
      res.json(details);
    } else {
      const basicModel = await CarModel.findById(req.params.id);
      if (basicModel) {
        const basicData = basicModel.toObject({ virtuals: true });
        res.json({
          ...basicData,
          description: 'Опис відсутній',
          facts: [],
          imageUrl: '',
        });
      } else {
        res.status(404).json({ error: 'Model not found' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          { id: user._id, email: user.email, name: user.name },
          SECRET_KEY,
          { expiresIn: '1h' },
        );

        res.json({
          accessToken: token,
          user: { email: user.email, name: user.name },
        });
      } else {
        res.status(401).json('Invalid email or password');
      }
    } else {
      res.status(401).json('Invalid email or password');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: 'New User',
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      SECRET_KEY,
      { expiresIn: '1h' },
    );

    res.json({
      accessToken: token,
      user: { email: newUser.email, name: newUser.name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
