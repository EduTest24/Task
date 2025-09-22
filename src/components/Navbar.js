"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, Bot } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 shadow-md border-b backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-colors">
      <div className="flex justify-between items-center">
        {/* Logo / Site Title */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight hover:opacity-80 transition"
        >
          Tasky
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-14 h-14 ring-2 ring-indigo-500/60 rounded-full transition transform hover:scale-110 hover:ring-indigo-400 shadow-md",
                  userButtonPopoverCard:
                    "backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-2xl border border-gray-200/40 dark:border-gray-700/40",
                  userButtonPopoverActionButton:
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700/60 transition-colors",
                  userButtonPopoverActionButtonIcon:
                    "w-4 h-4 text-indigo-500 dark:text-indigo-400",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Dashboard"
                  href="/dashboard"
                  labelIcon={<LayoutDashboard className="w-4 h-4" />}
                />
                <UserButton.Link
                  label="Agent"
                  href="/agent"
                  labelIcon={<Bot className="w-4 h-4" />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="px-5 font-medium rounded-full hover:bg-indigo-50 dark:hover:bg-gray-800"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
