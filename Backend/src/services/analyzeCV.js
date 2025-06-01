const axios = require('axios');

const analyzeCV = async (cvText) => {
  const HF_API_KEY = "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";
  const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

  const CV_PROMPT = `
[INST]
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
{{CV_CONTENT}}

Important: Return ONLY valid JSON without any additional text or explanations.
[/INST]`;

  try {
    const prompt = CV_PROMPT.replace('{{CV_CONTENT}}', cvText);
    
    const response = await axios.post(
      MODEL_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 1500,
          temperature: 0.3
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let result = response.data[0]?.generated_text || '';
    result = result.split('[/INST]').pop().trim();
    
    return JSON.parse(result);
  } catch (error) {
    console.error('CV Analysis Service Error:', error);
    throw new Error("AI analysis failed");
  }
};

module.exports = { analyzeCV };