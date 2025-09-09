export default function HowItWorks() {
  const steps = [
    {
      title: "1. Connect",
      desc: "Sign in with Google and allow Tasky to access your Gmail, Calendar, and Tasks seamlessly.",
      icon: "🔗",
    },
    {
      title: "2. Detect",
      desc: "Our AI scans your emails and messages, extracts deadlines, and organizes them into actionable tasks.",
      icon: "🤖",
    },
    {
      title: "3. Act",
      desc: "Your tasks and events are synced automatically—reminders, summaries, and schedules all handled for you.",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 text-center">
      <h3 className="text-3xl font-semibold mb-12">How Tasky’s AI Works</h3>
      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
