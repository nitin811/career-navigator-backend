const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connect karo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch(err => console.log("❌ MongoDB error:", err.message));

// Routes
const uploadRoute = require('./routes/upload');
const historyRoute = require('./routes/history');

app.use('/api', uploadRoute);
app.use('/api', historyRoute);

app.get('/', (req, res) => {
  res.json({ message: '🚀 Career Navigator Backend Running!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server chal raha hai port ${PORT} par`);
  console.log(`🔗 Test karo: http://localhost:${PORT}`);
});