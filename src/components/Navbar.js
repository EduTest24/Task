"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 shadow-sm border-b backdrop-blur-md flex justify-between items-center">
      {/* Logo / Site Title */}
      <Link
        href="/"
        className="text-2xl font-extrabold text-indigo-600 tracking-tight hover:opacity-80 transition"
      >
        Tasky
      </Link>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <Link href="/dashboard">
            <Button
              variant="default"
              className="hidden sm:flex items-center gap-2 shadow-sm cursor-pointer"
            >
              Dashboard
            </Button>
          </Link>
          <UserButton
            afterSignOutUrl="/"
            appearance={{ elements: { avatarBox: "w-10 h-10" } }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="px-5 font-medium">
              Login
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
