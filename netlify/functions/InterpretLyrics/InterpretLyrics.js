import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel(
    { model: process.env.GEMINI_MODEL_NAME },
    { apiVersion: "v1beta" }
  );
  const prompt = `Interpret the meaning of these lyrics: ${event.body}`;

  const result = await model.generateContent(prompt);

  try {
    const response = result.response;
    const interpretation = response.text();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: interpretation }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    };
  }
};
