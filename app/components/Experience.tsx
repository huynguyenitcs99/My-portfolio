"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Experience() {
  const timeline = [
    {
      year: "2024",
      title: "Senior Python Developer",
      company: "Scottech, Toledo",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      year: "2023",
      title: "Python Developer",
      company: "AutoGrid Systems, Naperville",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];

  return (
    <motion.section id="experience" className="max-w-6xl mx-auto px-6 py-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
      <h2 className="text-3xl font-serif font-bold text-white mb-12">Experience</h2>
      <div className="relative pl-10">
        <div className="absolute left top-0 bottom-0 w-[2px] bg-[#fbbc05] z-0"></div>
        {timeline.map((exp, i) => (
          <div key={i} className="relative mb-20">
            <div className="absolute left-1 top z-10 bg-gray-700 text-white text-base font-semibold px-4 py-1.5 rounded-md shadow-md">
              {exp.year}
            </div>
            <div className="absolute left top z-10 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-[#0f1624] rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-[#fbbc05] rounded-full shadow-md" />
              </div>
            </div>
            <div className="ml-10 relative top-4 bg-[#1e1e1e] text-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
              <p className="text-sm text-[#dddddd] mb-2">{exp.company}</p>
              <p className="text-sm text-[#aaaaaa] leading-relaxed whitespace-pre-line">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
