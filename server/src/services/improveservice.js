const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const improveResumeWithGroq = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS resume writer.

TASK:
Rewrite and improve the resume for the given job description.

RULES:
- Keep it professional
- Use strong action verbs
- Optimize for ATS
- Do NOT hallucinate fake experience
- Improve wording only

Resume:
${resumeText}

Job Description:
${jobDescription}

Return in this format:
{
  "professionalSummary": "...",
  "improvedBulletPoints": ["...", "..."],
  "skillsToAdd": ["...", "..."],
  "overallSuggestions": ["...", "..."]
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return completion.choices[0].message.content;
};

module.exports = improveResumeWithGroq;
