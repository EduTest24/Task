"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CTA() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <section className="py-24 px-6 text-center bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Start Supercharging Your Productivity
        </h3>
        <p className="mb-8 text-lg md:text-xl text-indigo-100">
          Join thousands of users who trust Tasky to organize their emails,
          tasks, and schedules with AI-powered automation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={handleClick}
            className="bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition"
          >
            {isSignedIn ? "Start Exploring" : "Get Started Free"}
          </Button>
        </div>

        {/* Social proof / credibility */}
        <p className="mt-8 text-sm text-indigo-200">
          No credit card required · 2,000+ users onboarded
        </p>
      </div>
    </section>
  );
}
