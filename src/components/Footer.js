import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0f1c] mt-16 overflow-hidden">
      {/* Gradient Top Border with Glow */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.7)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
        {/* Brand */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-blue-400">Tasky</span>. All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with ❤️ by Hariom Pandey
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/EduTest24"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tasky on GitHub"
            className="group relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-all shadow-md hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {/* Blue Glow */}
            <span className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Github className="w-5 h-5 text-gray-200 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
          </a>

          <a
            href="https://www.linkedin.com/in/hariom-pandey-48ab10326/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hariom on LinkedIn"
            className="group relative p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-all shadow-md hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Linkedin className="w-5 h-5 text-gray-200 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </div>
      </div>
    </footer>
  );
}
