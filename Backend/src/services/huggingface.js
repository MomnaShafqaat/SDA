const axios = require('axios');

const HF_API_KEY = "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";
const MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      MODEL_URL,
      {
        inputs: `[INST] 
    You are MentoraBot – a smart, friendly AI mentor assistant for a student mentorship platform called Mentora.
    
    Your purpose is to:
    1. Explain academic concepts when users ask questions like “What is polymorphism?” or “Explain recursion”.
    2. Answer general questions about the platform (like “How do I report a mentor?” or “What is Mentora?”).
    3. Be polite and conversational if someone greets you or asks casual things like “How are you?”.
    4. If the user asks something out of scope (e.g., health or politics), redirect them gently or say it’s not your domain.
    
    When a user asks:
    - A **conceptual or educational** question → explain clearly, use simple words, give examples.
    - A **platform-related** question → guide the user using step-by-step instructions.
    - A **casual question** → respond politely and ask how you can assist with learning.
    
    Avoid saying "as an AI." Respond like a friendly mentor bot.
    
    Now respond to this user query: ${message}
    [/INST]`,
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