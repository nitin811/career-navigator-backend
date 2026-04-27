const { analyzeWithGemini } = require("./geminiService");

// pdf-parse ko is tarike se import karo
const pdfParse = require("pdf-parse");

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file upload karo!" });
    }

    const targetRole = req.body.targetRole || "Software Developer";

    console.log("📄 PDF parse ho raha hai...");

    const options = {
      max: 0, // sabhi pages parse karo
    };

    const pdfData = await pdfParse(req.file.buffer, options);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        error: "PDF mein text nahi mila. Scanned PDF ho sakta hai.",
      });
    }

    console.log("✅ Text mila! Characters:", resumeText.length);
    console.log("🤖 Gemini se analysis ho rahi hai...");

    const analysis = await analyzeWithGemini(resumeText, targetRole);

    console.log("🎉 Analysis complete! ATS Score:", analysis.atsScore);

    res.json({
      success: true,
      data: analysis,
    });

  } catch (error) {
    console.error("❌ Error:", error.message);

    if (error.message.includes("JSON")) {
      return res.status(500).json({
        error: "AI response parse nahi hua. Dobara try karo.",
      });
    }

    res.status(500).json({ error: "Server error: " + error.message });
  }
};

module.exports = { analyzeResume };