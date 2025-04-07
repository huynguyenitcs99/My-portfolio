import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Sun, Moon, MessageSquare } from "lucide-react";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion } from "framer-motion";

// Animation Variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const aiProjects = [
  { title: "Real-Time Object Detection on Edge Devices", description: "Deployed a custom YOLOv5 model optimized with TensorRT to run on Nvidia Jetson Nano in real-time.", image: "/projects/project1.png", stack: ["YOLOv5", "TensorRT", "Jetson Nano"] },
  { title: "Audio Classification with CNNs", description: "Developed a CNN for sound classification on embedded devices using ESC-50 dataset and TFLite.", image: "/projects/project2.png", stack: ["Keras", "TFLite", "ESC-50"] },
  { title: "Multi-modal Vision-Sound AI", description: "Integrated audio and vision using transformers for event recognition tasks.", image: "/projects/project3.png", stack: ["Spectrogram", "ViT", "Contrastive Learning"] },
  { title: "AI-Powered Portfolio Search", description: "Built a semantic search system using OpenAI embeddings + Pinecone deployed in React.", image: "/projects/project4.png", stack: ["OpenAI", "Pinecone", "React"] },
  { title: "Edge AI for Traffic Monitoring", description: "Built and deployed object tracking and license plate recognition on Raspberry Pi with Coral USB.", image: "/projects/project5.png", stack: ["OpenCV", "Edge TPU", "Raspberry Pi"] },
  { title: "Smart Room Sound Detection", description: "Deployed on-device AI to classify doorbells, alarms, and voice in home automation.", image: "/projects/project6.png", stack: ["TinyML", "MFCC", "Microcontroller"] },
  { title: "GAN for Super-Resolution", description: "Implemented ESRGAN to enhance low-res surveillance footage for real-world use cases.", image: "/projects/project7.png", stack: ["PyTorch", "ESRGAN", "OpenCV"] },
  { title: "Custom Voice Assistant", description: "Created a wake word detection and NLP system for offline smart assistant.", image: "/projects/project8.png", stack: ["Speech Commands", "TensorFlow", "NLP"] },
  { title: "AI Tutor Chatbot", description: "Built a GPT-powered chatbot with contextual memory and Markdown rendering.", image: "/projects/project9.png", stack: ["GPT-4", "LangChain", "Vercel"] },
  { title: "Autonomous Drone Navigation", description: "Trained a vision-based reinforcement learning model to navigate drones through obstacles.", image: "/projects/project10.png", stack: ["RL", "DroneKit", "PyTorch"] }
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selected, setSelected] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const scrollRef = useRef();

  const quickReplies = [
    "What can this assistant do?",
    "Tell me about AI projects",
    "Show me publications",
    "Let's collaborate"
  ];

  useEffect(() => {
    document.body.className = darkMode ? "bg-[#0f1624] text-white" : "bg-white text-black";
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected(prev => {
        const next = (prev + 1) % aiProjects.length;
        const el = scrollRef.current?.children[next];
        if (el) {
          scrollRef.current.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-purple-400">Huy Nguyen</h1>
        <nav className="space-x-4 flex items-center text-sm font-medium">
          <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
          <a href="#certificates" className="hover:text-purple-300 transition-colors">Certificates</a>
          <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-purple-300 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full hover:bg-purple-300 hover:text-black transition">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </header>

      <motion.section id="about" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:flex-1">
            <p className="text-lg md:text-xl leading-relaxed">
              I’m Huy Nguyen, an AI engineer focused on deploying sound and vision models to edge devices using C++ and Python. I specialize in building efficient inference systems with TensorRT, TFLite, and microcontrollers.
            </p>
            <div className="mt-4">
              <a
                href="/HuyNguyen_CV.pdf"
                download
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-sm font-medium"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-[30%]">
            <img
              src="/avatar.png"
              alt="Avatar of Huy Nguyen"
              className="rounded-xl object-cover shadow-lg border-4 border-purple-400 aspect-square w-full"
            />
          </div>
        </div>
      </motion.section>


      <motion.section id="projects" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left side (Scroll + Description) */}
          <div className="flex flex-col gap-4 md:w-1/2">
            
            {/* Scroll Project Buttons */}
            <div className="relative">
              <div
                className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
                ref={scrollRef}
                id="projectScroll"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {aiProjects.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelected(i);
                      scrollRef.current.scrollTo({
                        left: scrollRef.current.children[i].offsetLeft - 16,
                        behavior: 'smooth'
                      });
                    }}
                    className={`flex-shrink-0 snap-start border rounded-md shadow-sm w-[calc(100%/3-0.5rem)] h-[120px] overflow-hidden text-center ${
                      selected === i ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center justify-between h-full py-2">
                      <img src={p.image} className="h-12 object-cover" />
                      <span className="text-xs font-medium px-1 break-words">{p.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
      
            {/* Project Info */}
            <div className="rounded-xl overflow-y-auto scrollbar-hide pr-2 max-h-40">
              <h3 className="text-xl font-semibold mb-2">{aiProjects[selected].title}</h3>
              <p className="text-sm mb-2">{aiProjects[selected].description}</p>
              <div className="flex flex-wrap gap-2">
                {aiProjects[selected].stack.map((tech, idx) => (
                  <span key={idx} className="bg-purple-600 text-white px-2 py-1 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
      
          {/* Right side (Large Image) */}
          <div className="md:w-1/2 flex items-center justify-center">
            <img
              src={aiProjects[selected].image}
              className="rounded-xl w-full h-auto max-h-72 object-cover shadow-lg"
            />
          </div>
      
        </div>
      </motion.section>

      <motion.section id="certificates" className="max-w-6xl mx-auto px-6 py-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
        <h2 className="text-2xl font-bold mb-4">Certificates</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-purple-100 text-black p-4 rounded-xl">TensorFlow Developer Certificate - Google</li>
          <li className="bg-purple-100 text-black p-4 rounded-xl">Deep Learning Specialization - Andrew Ng</li>
          <li className="bg-purple-100 text-black p-4 rounded-xl">Edge AI Fundamentals - Intel OpenVINO</li>
        </ul>
      </motion.section>

      <motion.section
        id="experience"
        className="max-w-6xl mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-serif font-bold text-white mb-12">Experience</h2>
      
        <div className="relative pl-10">
          {/* Vertical Line */}
          <div className="absolute left top-0 bottom-0 w-[2px] bg-[#fbbc05] z-0" id="timeline-line"></div>
      
          {[
            {
              year: "2024",
              title: "Senior Python Developer",
              company: "Scottech, Toledo",
              desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
            },
            {
              year: "2023",
              title: "Python Developer",
              company: "AutoGrid Systems, Naperville",
              desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.`,
            },
          ].map((exp, i) => (
            <div key={i} className="relative mb-20">
              {/* Year Box */}
              <div className="absolute left-1 top z-10 bg-gray-700 text-white text-base font-semibold px-4 py-1.5 rounded-md shadow-md">
                {exp.year}
              </div>
      
              {/* Dot: Outer ring + inner dot */}
              <div className="absolute left top z-10 transform -translate-x-1/2">
                {/* Outer ring */}
                <div className="w-8 h-8 bg-[#0f1624] rounded-full flex items-center justify-center">
                  {/* Inner yellow dot */}
                  <div className="w-5 h-5 bg-[#fbbc05] rounded-full shadow-md" />
                </div>
              </div>
      
              {/* Content */}
              <div className="ml-10 relative top-4 bg-[#1e1e1e] text-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
                <p className="text-sm text-[#dddddd] mb-2">{exp.company}</p>
                <p className="text-sm text-[#aaaaaa] leading-relaxed whitespace-pre-line">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="max-w-6xl mx-auto px-6 py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[
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
          ].map((skill, i) => (
            <div
              key={i}
              className="bg-[#1e293b] hover:bg-[#2a384f] transition-all duration-300 rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-white"
            >
              <img src={skill.icon} alt={skill.name} className="h-12 w-12 mb-3 object-contain" />
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {showChat && (
        <div className="fixed bottom-20 right-6 bg-white text-black w-72 rounded-xl shadow-xl p-4 z-50">
          <h3 className="font-semibold text-lg mb-2">Ask HuyBot 🤖</h3>
          <div className="flex flex-col gap-2 mb-2">
            {quickReplies.map((q, i) => (
              <button key={i} className="bg-purple-100 hover:bg-purple-200 text-sm p-2 rounded-md text-left">{q}</button>
            ))}
          </div>
          <input type="text" placeholder="Type a message..." className="w-full border px-3 py-2 rounded-md text-sm" />
        </div>
      )}

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center shadow-lg z-50"
      >
        <MessageSquare size={24} className="text-white" />
      </button>

      <footer className="bg-[#0f1624] text-white px-6 py-10 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Left: Follow me */}
          <div className="text-left">
            <h3 className="font-semibold mb-3">Follow me at :</h3>
            <div className="flex justify-start">
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/huynguyenitcs" target="_blank" className="p-2 rounded-md hover:bg-purple-600/20 transition">
                  <SiLinkedin size={20} />
                </a>
                <a href="https://github.com/huynguyenitcs99" target="_blank" className="p-2 rounded-md hover:bg-purple-600/20 transition">
                  <SiGithub size={20} />
                </a>
              </div>
            </div>
          </div>
      
          {/* Right: Contact info */}
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
      
        {/* Copyright */}
        <div className="mt-10 text-center text-gray-500">
          © 2025 <span className="text-white font-medium">Made by Huy Nguyen</span>
        </div>
      </footer>

    </Router>
  );
}

export default App;
