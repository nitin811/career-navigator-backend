const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');

// Save analysis
router.post('/history/save', async (req, res) => {
  try {
    const analysis = new Analysis(req.body);
    await analysis.save();
    res.json({ success: true, id: analysis._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get history by userId
router.get('/history/:userId', async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, data: analyses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete analysis
router.delete('/history/:id', async (req, res) => {
  try {
    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;