require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    const data = await response.json();
    
    console.log("\n✅ Available Models:\n");
    data.models?.forEach(m => {
      if (m.supportedGenerationMethods?.includes("generateContent")) {
        console.log("→", m.name);
      }
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

listModels();