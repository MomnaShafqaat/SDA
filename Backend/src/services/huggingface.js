const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      MODEL_URL,
      {
        inputs: `[INST] You are a helpful study assistant. Explain this clearly: ${message} [/INST]`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const generatedText = response.data[0]?.generated_text || "I'm still learning, please try again";
    return generatedText.split('[/INST]').pop().trim();
  } catch (error) {
    console.error('AI Service Error:', error.response?.data || error.message);
    throw new Error("Our assistant is busy. Please try again soon!");
  }
};

module.exports = { getAIResponse };