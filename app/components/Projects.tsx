"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import aiProjects from "../data/aiProjects";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [thumbnailsPerView, setThumbnailsPerView] = useState(3); // ⭐️ new

  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const userInactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoScroll = () => {
    if (autoScrollTimer.current) return;
    autoScrollTimer.current = setInterval(() => {
      setSelected((prev) => {
        const next = (prev + 1) % aiProjects.length;
        const el = scrollRef.current?.children[next] as HTMLElement;
        const container = scrollRef.current;

        if (el && container) {
          const offsetCenter = el.offsetLeft - container.offsetLeft;
          container.scrollTo({ left: offsetCenter, behavior: "smooth" });
        }

        return next;
      });
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  };

  const resetInactivityTimer = () => {
    if (userInactivityTimer.current) clearTimeout(userInactivityTimer.current);
    userInactivityTimer.current = setTimeout(() => {
      startAutoScroll();
    }, 30000);
  };

  const handleUserInteraction = () => {
    stopAutoScroll();
    resetInactivityTimer();
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -180 * 1.2, behavior: "smooth" });
    handleUserInteraction();
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 180 * 1.2, behavior: "smooth" });
    handleUserInteraction();
  };

  useEffect(() => {
    const ref = scrollRef.current;

    const onUserScroll = (e: WheelEvent) => {
      if (e.shiftKey) {
        handleUserInteraction();
      }
      checkScroll();
    };

    if (ref) {
      checkScroll();
      ref.addEventListener("scroll", checkScroll);
      ref.addEventListener("wheel", onUserScroll);
      setTimeout(() => checkScroll(), 100);
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
      if (userInactivityTimer.current) clearTimeout(userInactivityTimer.current);
      ref?.removeEventListener("scroll", checkScroll);
      ref?.removeEventListener("wheel", onUserScroll);
    };
  }, []);

  // ⭐️ Handle responsive thumbnails count
  useEffect(() => {
    const updateThumbnails = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setThumbnailsPerView(2);
      } else {
        setThumbnailsPerView(3);
      }
    };

    updateThumbnails();
    window.addEventListener("resize", updateThumbnails);
    return () => window.removeEventListener("resize", updateThumbnails);
  }, []);

  return (
    <motion.section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-4 md:w-1/2 items-center">
          {/* Scroll Area + Arrows */}
          <div className="flex items-center gap-2">
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="z-10 bg-black/60 text-white rounded-full p-1 shadow-md hover:bg-black/80 transition"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Scrollable Thumbnails */}
            <div
              ref={scrollRef}
              className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide"
              style={{
                display: "flex",
                gap: "0.5rem",
                padding: "1rem 0",
                minWidth: `calc(${thumbnailsPerView} * 180px + ${(thumbnailsPerView - 1)} * 0.5rem)`,
                maxWidth: `calc(${thumbnailsPerView} * 180px + ${(thumbnailsPerView - 1)} * 0.5rem)`,
                marginLeft: "auto",
                marginRight: "auto",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {aiProjects.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(i);
                    const el = scrollRef.current?.children[i] as HTMLElement;
                    const container = scrollRef.current;
                    if (el && container) {
                      const offsetCenter = el.offsetLeft - container.offsetLeft;
                      container.scrollTo({ left: offsetCenter, behavior: "smooth" });
                    }
                    handleUserInteraction();
                  }}
                  className={`w-[180px] h-[120px] flex-shrink-0 snap-start border rounded-md shadow-sm overflow-hidden text-center ${
                    selected === i ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <div className="flex flex-col items-center justify-between h-full py-2">
                    <img src={p.image} alt={p.title} className="h-12 object-cover" />
                    <span className="text-xs font-medium px-1 break-words">{p.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="z-10 bg-black/60 text-white rounded-full p-1 shadow-md hover:bg-black/80 transition"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          {/* Project Details */}
          <div className="rounded-xl overflow-y-auto scrollbar-hide pr-2 max-h-40 w-full">
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

        {/* Right Side – Big image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={aiProjects[selected].image}
            className="rounded-xl w-full h-auto max-h-72 object-cover shadow-lg"
            alt={aiProjects[selected].title}
          />
        </div>
      </div>
    </motion.section>
  );
}
