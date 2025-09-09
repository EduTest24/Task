import { Inter, Fira_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

// Inter for modern, clean UI (great for workspace)
// Fira Mono for chat/communication/code-like elements
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"], // <-- Add this line
});

export const metadata = {
  title: "Tasky – Your AI Workspace Agent",
  description:
    "Tasky is an AI Agent for managing your personal workspace and integrating with Google apps.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${firaMono.variable} antialiased min-h-screen`}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
          }}
        >
          <Navbar />
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
