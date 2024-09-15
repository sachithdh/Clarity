const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generate = async () => {
  const prompt = "What is the purpose of life?";

  const res = await model.generateContent(prompt);
  console.log(res.response.text());
};

generate();
