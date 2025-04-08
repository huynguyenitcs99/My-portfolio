"use client";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const skills = [
  { name: "TensorFlow", icon: "/icons/tensorflow.png" },
  { name: "TFLite", icon: "/icons/tflite.png" },
  { name: "PyTorch", icon: "/icons/pytorch.png" },
  { name: "C++", icon: "/icons/cpp.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "ONNX", icon: "/icons/onnx.png" },
  { name: "Docker", icon: "/icons/docker.png" },
  { name: "Git", icon: "/icons/git.png" },
  { name: "OpenCV", icon: "/icons/opencv.png" },
  { name: "React", icon: "/icons/react.png" },
];

export default function Skills() {
  return (
    <motion.section id="skills" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
      <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, i) => (
          <div key={i} className="bg-[#1e293b] hover:bg-[#2a384f] transition-all duration-300 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-white">
            <img src={skill.icon} alt={skill.name} className="h-12 w-12 mb-3 object-contain" />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
