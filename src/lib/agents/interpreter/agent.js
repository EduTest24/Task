import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function interpretJson(body) {
  const agentType = body.agent || "generic";

  const systemPrompt = `
You are an assistant that converts JSON into clear, natural sentences for users.
Be concise, friendly, and context-aware. Adapt your tone based on the agent type.

- If it's "calendar": summarize events (title, date, time, location).
- If it's "tasks": explain task status, due dates, or updates.
- If it's "gmail": Summarize subject, sender, and time,  Classify importance: High / Medium / Low, Suggest an action: * "Add to Calendar" if it is about meetings, events, or deadlines. * "Add to Tasks" if it is a todo, assignment, or reminder. * "No Action" if nothing to schedule or track.

- If "generic": just describe the JSON naturally.
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Agent type: ${agentType}\nJSON:\n${JSON.stringify(
          body,
          null,
          2
        )}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
