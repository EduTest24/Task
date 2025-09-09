import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Brand */}
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Tasky. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </a>
        </div>
      </div>
    </footer>
  );
}
