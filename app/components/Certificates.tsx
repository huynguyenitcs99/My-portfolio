"use client";
import { motion } from "framer-motion";

export default function Certificates() {
  return (
    <motion.section id="certificates" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }}>
      <h2 className="text-2xl font-bold mb-4">Certificates</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li className="bg-purple-100 text-black p-4 rounded-xl">TensorFlow Developer Certificate - Google</li>
        <li className="bg-purple-100 text-black p-4 rounded-xl">Deep Learning Specialization - Andrew Ng</li>
        <li className="bg-purple-100 text-black p-4 rounded-xl">Edge AI Fundamentals - Intel OpenVINO</li>
      </ul>
    </motion.section>
  );
}
