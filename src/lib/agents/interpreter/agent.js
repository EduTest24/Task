import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const agentPrompts = {
  gmail: `
You are an email assistant.
For each email in the JSON:
- Summarize subject, sender, and time.
- Classify importance: High / Medium / Low.
- Suggest an action:
   * "Add to Calendar" if it is about meetings, events, or deadlines.
   * "Add to Tasks" if it is a todo, assignment, or reminder.
   * "No Action" if nothing to schedule or track.
Format output as a numbered list with emojis if suitable.
`,

  calendar: `
You are a smart calendar assistant.
For each event in the JSON:
- Summarize title, date, time, and location.
- Mark conflicts if overlapping with another event.
- Highlight important events (e.g., exams, deadlines, client meetings).
- Suggest actions:
   * Add reminder
   * Reschedule if conflicting
   * Convert to task if follow-up work is needed
Output as a friendly bullet-point list.
`,

  tasks: `
You are a productivity assistant.
For each task in the JSON:
- Summarize title, due date, and status.
- Mark urgency:
   * "🔥 Overdue" if past due date.
   * "⚠️ Due Soon" if within 2 days.
   * "✅ Normal" otherwise.
- Suggest actions:
   * Mark as complete if done.
   * Add to Calendar if it has a time/date.
   * Break into subtasks if complex.
Output should be clear and structured.
`,

  generic: `
You are a JSON interpreter. Summarize the data clearly and naturally.
`,
};

export async function interpretJson(body) {
  const agentType = body.agent || "generic";
  const systemPrompt = agentPrompts[agentType] || agentPrompts.generic;

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
