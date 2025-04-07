const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(bodyParser.json());

// CORS configuration - more permissive for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Check if API key is available
if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.error("ERROR: Gemini API key is not set or is using the default placeholder value.");
  console.error("Please update the .env file with your actual Gemini API key.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/get-career-options', async (req, res) => {
  const { name, interests, skills, goals } = req.body;

  // Validate required fields
  if (!interests || !skills || !goals) {
    return res.status(400).json({ error: 'Missing required fields: interests, skills, and goals are required' });
  }

  const prompt = `
    Given the following details:
    - Name: ${name}
    - Interests: ${interests}
    - Skills: ${skills}
    - Career goals: ${goals}

    Suggest 3 unique career options suitable for this person. Provide a short reason for each suggestion.
  `;

  try {
    // Check if API key is valid
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Gemini API key is not configured properly');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.json({ suggestions: response });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ 
      error: 'Something went wrong while fetching career options',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
