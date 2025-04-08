"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <motion.section id="about" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:flex-1">
          <p className="text-lg md:text-xl leading-relaxed">
            I’m Huy Nguyen, an AI engineer focused on deploying sound and vision models to edge devices using C++ and Python...
          </p>
          <div className="mt-4">
            <a href="/HuyNguyen_CV.pdf" download className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-sm font-medium">Download CV</a>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-[30%]">
          <img src="/avatar.png" alt="Avatar" className="rounded-xl object-cover shadow-lg border-4 border-purple-400 aspect-square w-full" />
        </div>
      </div>
    </motion.section>
  );
}
