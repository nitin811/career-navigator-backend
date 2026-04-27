const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeWithGemini = async (resumeText, targetRole) => {

  const prompt = `
You are an expert career coach and ATS (Applicant Tracking System) specialist. Always respond in English only.

Below is a candidate's resume text and their target role.

RESUME TEXT:
"""
${resumeText}
"""

TARGET ROLE: ${targetRole}

Respond STRICTLY in the JSON format below. No extra text, no explanations, just pure JSON. All values must be in English only.

{
  "atsScore": <a number between 0-100>,
  "scoreLabel": <"Poor" | "Average" | "Good" | "Excellent">,
  "scoreReason": <1-2 lines explaining why this score was given>,
  "foundKeywords": [<important keywords found in the resume, max 8>],
  "missingKeywords": [<important keywords missing for the target role, max 8>],
  "candidateName": <extract name from resume, if not found use "Candidate">,
  "currentSkills": [<top skills extracted from resume, max 6>],
  "roadmap": [
    {
      "week": 1,
      "title": <title for this week>,
      "description": <2-3 lines explaining what to learn this week>,
      "topics": [<3-4 specific topics to cover>],
      "resources": [
        { "name": <resource name>, "type": <"YouTube" | "Documentation" | "Course" | "Practice">, "url": <actual working URL> }
      ],
      "estimatedHours": <number>
    },
    { "week": 2, "title": "", "description": "", "topics": [], "resources": [], "estimatedHours": 0 },
    { "week": 3, "title": "", "description": "", "topics": [], "resources": [], "estimatedHours": 0 },
    { "week": 4, "title": "", "description": "", "topics": [], "resources": [], "estimatedHours": 0 }
  ],
  "overallAdvice": <2-3 lines of overall career advice in English>
}
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 4000,
  });

  const response = completion.choices[0]?.message?.content || "";

  const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = { analyzeWithGemini };