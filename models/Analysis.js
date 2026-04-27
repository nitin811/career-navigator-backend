const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  candidateName: String,
  targetRole: String,
  atsScore: Number,
  scoreLabel: String,
  scoreReason: String,
  foundKeywords: [String],
  missingKeywords: [String],
  currentSkills: [String],
  roadmap: [{
    week: Number,
    title: String,
    description: String,
    topics: [String],
    estimatedHours: Number,
    resources: [{
      name: String,
      type: String,
      url: String
    }]
  }],
  overallAdvice: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", analysisSchema);