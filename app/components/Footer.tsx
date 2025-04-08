"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#0f1624] text-white px-6 py-10 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="text-left">
          <h3 className="font-semibold mb-3">Follow me at :</h3>
          <div className="flex gap-3">
            <a href="https://www.linkedin.com/in/huynguyenitcs" target="_blank" className="p-2 rounded-md hover:bg-purple-600/20 transition">
              <SiLinkedin size={20} />
            </a>
            <a href="https://github.com/huynguyenitcs99" target="_blank" className="p-2 rounded-md hover:bg-purple-600/20 transition">
              <SiGithub size={20} />
            </a>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="flex items-center justify-end gap-2 text-sm">
            <Phone size={16} /> +84 941 551 396
          </p>
          <p className="flex items-center justify-end gap-2 text-sm">
            <Mail size={16} />
            <a href="mailto:huynguyen.itcs99@gmail.com" className="text-purple-300 hover:underline">huynguyen.itcs99@gmail.com</a>
          </p>
          <p className="flex items-center justify-end gap-2 text-sm">
            <MapPin size={16} /> Ho Chi Minh City, Vietnam
          </p>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500">
        © 2025 <span className="text-white font-medium">Made by Huy Nguyen</span>
      </div>
    </footer>
  );
}
