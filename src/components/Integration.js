"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const integrations = [
  {
    title: "Gmail",
    desc: "Connect your Gmail to let AI summarize, extract tasks, and prioritize what really matters.",
    img: "/gmail.png",
  },
  {
    title: "Google Calendar",
    desc: "AI auto-schedules tasks & meetings on your Calendar without conflicts.",
    img: "/calendar.png",
  },
  {
    title: "Google Drive",
    desc: "Organize files, fetch docs, and attach them to tasks with Drive integration.",
    img: "/drive.png",
  },
  {
    title: "Google Tasks",
    desc: "Seamlessly manage your to-dos. AI creates, tracks, and updates tasks for you.",
    img: "/tasks.png",
  },
];

export default function Integrations() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Seamless Google Integrations
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Sign in with Google once. Approve access to Gmail, Calendar, Drive,
          and Tasks. From there, our AI agent communicates with your tools
          directly, helping you manage work with a single prompt — no sweat.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {integrations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                <CardContent className="flex items-center gap-6 p-6">
                  <img src={item.img} alt={item.title} className="h-14" />
                  <div className="text-left">
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Flow explanation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-white shadow-xl rounded-3xl">
            <h4 className="text-2xl font-semibold mb-4">How It Works</h4>
            <div className="flex flex-col md:flex-row items-center gap-6 text-left">
              <div className="flex-1 space-y-4">
                <p className="text-gray-700">
                  1️⃣ <b>Google Sign-In</b> → You sign in securely with your
                  Google account.
                </p>
                <p className="text-gray-700">
                  2️⃣ <b>Grant Permissions</b> → Approve access for Gmail,
                  Calendar, Drive, and Tasks to unlock the full power of AI.
                </p>
                <p className="text-gray-700">
                  3️⃣ <b>AI at Work</b> → Give one simple prompt, and the agent
                  manages your inbox, schedules tasks, and keeps you on track.
                </p>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                {/* A mini animated browser window look */}
                <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="ml-3 text-gray-400 text-sm">AI Agent</span>
                  </div>
                  <div className="p-4 text-sm space-y-2">
                    <p className="text-gray-300">User: "Plan my week"</p>
                    <p className="text-blue-400 animate-pulse">
                      AI is organizing tasks...
                    </p>
                    <div className="bg-gray-800 p-2 rounded-md mt-3">
                      <p className="text-green-400">✔ Meeting scheduled</p>
                      <p className="text-green-400">
                        ✔ 3 tasks added to Google Tasks
                      </p>
                      <p className="text-green-400">✔ Emails prioritized</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
