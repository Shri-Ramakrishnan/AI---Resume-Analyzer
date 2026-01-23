const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const extractJSON = (text) => {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON found in AI response");
  }

  const jsonString = text.slice(firstBrace, lastBrace + 1);
  return JSON.parse(jsonString);
};

const analyzeResumeWithGroq = async (resumeText, jobDescription) => {
  const prompt = `
You are an ATS resume analyzer.

Analyze the resume strictly against the job description.

RULES:
- Output ONLY valid JSON
- No explanations
- No markdown
- No extra text

JSON FORMAT:
{
  "atsScore": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "roleFitSummary": string
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
  });

  const raw = completion.choices[0].message.content;

  console.log("🤖 RAW AI RESPONSE:\n", raw);

  try {
    return extractJSON(raw);
  } catch (error) {
    console.error("❌ JSON extraction failed");
    throw new Error("AI response parsing failed");
  }
};

module.exports = analyzeResumeWithGroq;
