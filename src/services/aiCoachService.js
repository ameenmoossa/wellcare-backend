const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateWorkoutAdvice = async ({
  day,
  workoutType,
  duration,
  intensity,
  gymAccess,
  streak,
  missedDays,
}) => {
  const prompt = `
You are a professional fitness coach.

Workout details:
- Day: ${day}
- Workout: ${workoutType}
- Duration: ${duration} minutes
- Intensity: ${intensity}
- Gym access: ${gymAccess}
- Current streak: ${streak}
- Missed days: ${missedDays}

Rules:
- Do NOT suggest new workouts
- Do NOT change the plan
- Give short, motivating recovery advice (2–3 sentences)
`;

  try {
    const completion = await client.responses.create({
      model: process.env.AI_COACH_MODEL || "gpt-4o-mini",
      input: prompt,
      max_output_tokens: Number(process.env.AI_COACH_MAX_TOKENS) || 150,
      temperature: Number(process.env.AI_COACH_TEMPERATURE) || 0.7,
    });

    return completion.output_text;
  } catch (err) {
    console.error("OPENAI ERROR:", err.message);
    throw err;
  }
};











