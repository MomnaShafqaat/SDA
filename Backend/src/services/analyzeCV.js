const axios = require('axios');
const { jsonrepair } = require('jsonrepair'); // Make sure to install this: npm install jsonrepair

const analyzeCV = async (cvText) => {
  const OPENROUTER_API_KEY = "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";
  const MODEL = "mistralai/mistral-7b-instruct";

  const CV_PROMPT = `
You are a professional CV analyzer AI. Your task is to analyze CVs/resumes and provide detailed feedback in the following JSON format:

{
  "summary": "Brief professional summary",
  "strengths": ["list", "of", "key strengths"],
  "weaknesses": ["list", "of", "areas for improvement"],
  "experience_score": 0-10,
  "education_score": 0-10,
  "skills_score": 0-10,
  "overall_score": 0-100,
  "improvement_suggestions": ["specific", "actionable", "suggestions"],
  "job_recommendations": ["suitable", "job roles"]
}

Analysis Guidelines:
1. Evaluate professional experience: duration, relevance, progression
2. Assess education: degrees, certifications, relevance
3. Analyze skills: technical, soft skills, keyword optimization
4. Check structure: clarity, organization, length appropriateness
5. Identify missing elements: certifications, quantifiable achievements
6. Suggest improvements: action verbs, metrics, formatting
7. Recommend suitable job roles based on experience

CV Content:
${cvText}

Important: Return ONLY valid JSON without any extra explanation or comment.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: CV_PROMPT,
          },
        ],
        max_tokens: 1500,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost", // Optional but helps track usage
        },
      }
    );

    const output = response.data.choices[0]?.message?.content || '';
    const cleanJson = JSON.parse(jsonrepair(output)); // Fixes any minor format issues

    return cleanJson;
  } catch (error) {
    console.error("CV Analysis Service Error:", error.message);
    throw new Error("AI analysis failed");
  }
};

module.exports = { analyzeCV };
