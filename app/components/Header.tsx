"use client";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export default function Header({ darkMode, setDarkMode }: any) {
  useEffect(() => {
    document.body.className = darkMode ? "bg-[#0f1624] text-white" : "bg-white text-black";
  }, [darkMode]);

  return (
    <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight text-purple-400">Huy Nguyen</h1>
      <nav className="space-x-4 flex items-center text-sm font-medium">
        <a href="#about" className="hover:text-purple-300">About</a>
        <a href="#certificates" className="hover:text-purple-300">Certificates</a>
        <a href="#projects" className="hover:text-purple-300">Projects</a>
        <a href="#skills" className="hover:text-purple-300">Skills</a>
        <a href="#contact" className="hover:text-purple-300">Contact</a>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full hover:bg-purple-300 hover:text-black">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
}
