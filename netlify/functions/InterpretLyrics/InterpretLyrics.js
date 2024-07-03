import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export const handler = async (event) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL_NAME,
    safetySettings,
  });

  const prompt = `Interpret the meaning of these lyrics: ${event.body}`;
  const result = await model.generateContent(prompt);

  try {
    const response = result.response;
    console.log(response);
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
