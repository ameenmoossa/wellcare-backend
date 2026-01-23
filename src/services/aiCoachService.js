const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getCoachInsight = async ({ intensity, duration, goal }) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY missing");
  }

  const prompt = `
You are a professional fitness AI coach.

User goal: ${goal}
Workout intensity: ${intensity}
Workout duration: ${duration} minutes

Give short, practical coaching advice for today.
`;

  const response = await openai.chat.completions.create({
    model: process.env.AI_COACH_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a fitness coach." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  return response.choices[0].message.content;
};




