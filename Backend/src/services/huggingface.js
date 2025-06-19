const axios = require('axios');

const OPENROUTER_API_KEY = "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";
const MODEL = "mistralai/mistral-7b-instruct";

const getAIResponse = async (message) => {
  try {
    const prompt = `You are MentoraBot – a smart, friendly AI mentor assistant for a student mentorship platform called Mentora.

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

Now respond to this user query: ${message}`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost" // optional but good practice
        }
      }
    );

    return response.data.choices[0]?.message?.content?.trim() || "I'm still learning, please try again";
  } catch (error) {
    console.error('AI Service Error:', error.response?.data || error.message);
    throw new Error("Our assistant is busy. Please try again soon!");
  }
};

module.exports = { getAIResponse };
