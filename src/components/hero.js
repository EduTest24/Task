"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs"; // Clerk hook
import Link from "next/link";

export default function Hero() {
  const { isSignedIn, user } = useUser();

  return (
    <section className="relative overflow-hidden text-center py-32 px-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Decorative blurred background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {isSignedIn ? (
        <>
          {/* Small Welcome Text */}
          <p className="text-lg text-gray-600 mb-2">
            Welcome back, {user?.firstName || "Explorer"}
          </p>

          {/* Main Heading for exploring */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Let’s continue exploring 🚀
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Jump right back into your productivity flow — Tasky is keeping your
            workspace in sync.
          </p>

          {/* Button */}
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/dashboard">
              <Button className="px-8 py-8 cursor-pointer text-2xl font-semibold rounded-4xl text-white bg-purple-600 hover:bg-purple-700 shadow-lg transition">
                Start Exploring
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Personal AI Agent for Productivity
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Tasky seamlessly connects with your Google Workspace — managing
            emails, calendar events, and documents to keep you focused and in
            control.
          </p>

          {/* Button */}
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/sign-in">
              <Button className="px-8 py-8 text-2xl font-semibold rounded-4xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition">
                Get Started
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
