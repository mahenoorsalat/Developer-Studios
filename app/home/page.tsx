"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ArrowUpRight, Plus, Minus, MoveRight, ArrowDown } from "lucide-react";

// --- UTILS ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

// --- COMPONENTS ---

// 1. PRELOADER (The "Curtain" Effect)
const Preloader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 2.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-9xl font-bold tracking-tighter">{count}%</h1>
        <p className="animate-pulse text-sm uppercase tracking-widest text-zinc-500">
          Developer Studios®
        </p>
      </div>
    </motion.div>
  );
};

// 2. MAGNETIC CURSOR BUTTON
const MagneticButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </motion.button>
  );
};

// --- SECTIONS ---

// HERO WITH "AURORA" BACKGROUND
const Hero = () => {
  return (
    <section className="relative flex h-screen w-full flex-col justify-end overflow-hidden bg-zinc-950 px-4 pb-12 sm:px-12">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[30%] -left-[10%] h-[1000px] w-[1000px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[1px] w-20 bg-white/30" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Est. 2025
          </span>
        </div>

        <h1 className="text-[12vw] font-bold leading-[0.8] tracking-tighter text-white">
          <span className="block">DIGITAL</span>
          <span className="flex items-center gap-4">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1, delay: 3, ease: "circOut" }}
              className="block h-[8vw] overflow-hidden rounded-full bg-zinc-800"
            >
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
                className="h-full w-full object-cover opacity-80"
                alt="Creative"
              />
            </motion.span>
            ALCHEMY
          </span>
        </h1>
        
        <div className="mt-12 flex w-full justify-between border-t border-white/10 pt-6">
           <p className="max-w-md text-lg text-zinc-400">
             Developer Studios® crafts digital experiences that define industry standards.
           </p>
           <ArrowDown className="animate-bounce text-white" />
        </div>
      </div>
    </section>
  );
};

// TEXT REVEAL ON SCROLL
const Philosophy = () => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = "We believe in the power of silence in a noisy world. Our designs are not just seen; they are felt. Minimalist structure, maximalist impact.".split(" ");

  return (
    <section className="bg-zinc-950 px-4 py-32 sm:px-12">
      <p
        ref={element}
        className="flex flex-wrap gap-x-4 text-4xl leading-tight text-white md:text-6xl lg:text-7xl"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
          return (
            <motion.span key={i} style={{ opacity }} className="relative">
              {word}
            </motion.span>
          );
        })}
      </p>
    </section>
  );
};

// PARALLAX MASONRY WORK
const Work = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const projects = [
    { name: "Lumina Interface", type: "Fintech", src: "https://images.unsplash.com/photo-1481487484168-9b930d5b7960?q=80&w=1000&auto=format&fit=crop" },
    { name: "Chronos", type: "AI SaaS", src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" },
    { name: "Atlas", type: "Architecture", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" },
    { name: "Vesper", type: "Fashion", src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <section ref={container} className="min-h-screen bg-zinc-950 px-4 py-20 sm:px-12">
      <div className="mb-20 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">Selected Work (2024-25)</h2>
        <div className="h-[1px] w-full max-w-md bg-white/10" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div style={{ y }} className="flex flex-col gap-20">
          {projects.slice(0, 2).map((p, i) => (
            <div key={i} className="group relative cursor-none">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-[600px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="text-3xl font-medium text-white">{p.name}</h3>
                <span className="text-sm uppercase text-zinc-500">{p.type}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div style={{ y: y2 }} className="flex flex-col gap-20 pt-32">
          {projects.slice(2, 4).map((p, i) => (
            <div key={i} className="group relative">
               <div className="overflow-hidden rounded-lg">
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-[600px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="text-3xl font-medium text-white">{p.name}</h3>
                <span className="text-sm uppercase text-zinc-500">{p.type}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// HIGH-END SERVICES ACCORDION
const Services = () => {
  const [selected, setSelected] = useState(0);

  const services = [
    { title: "Design", desc: "UI/UX, Branding, Motion, 3D", price: "Starts at $5k" },
    { title: "Development", desc: "Next.js, React Native, WebGL", price: "Starts at $10k" },
    { title: "Strategy", desc: "SEO, Marketing, Growth", price: "Starts at $3k" },
    { title: "AI Agents", desc: "LLM, Automation, RAG", price: "Custom Quote" },
  ];

  return (
    <section className="bg-zinc-950 py-32">
      <div className="px-4 sm:px-12">
         <h2 className="mb-20 text-6xl font-bold tracking-tighter text-white">Capabilties.</h2>
         
         <div className="flex flex-col border-t border-white/10">
            {services.map((s, i) => (
               <div 
                 key={i} 
                 onMouseEnter={() => setSelected(i)}
                 className="group relative flex cursor-pointer flex-col border-b border-white/10 py-12 transition-colors hover:bg-white/5 md:flex-row md:items-center md:justify-between px-4"
               >
                  <span className="mb-4 font-mono text-sm text-zinc-500 md:mb-0">0{i + 1}</span>
                  <h3 className="text-4xl font-medium text-zinc-400 transition-all group-hover:pl-4 group-hover:text-white md:text-6xl">{s.title}</h3>
                  <div className="mt-4 flex max-w-xs flex-col md:mt-0 md:text-right">
                     <p className="text-lg text-white">{s.desc}</p>
                     <p className="text-sm text-zinc-500">{s.price}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  )
}

// CTA / FOOTER
const Footer = () => {
  return (
    <div 
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full bg-[#0a0a0a]">
         <div className="flex h-full flex-col justify-between px-12 py-20">
            <div className="flex justify-between">
               <h2 className="text-[10vw] font-bold leading-[0.8] tracking-tighter text-white">
                  LET'S <br/> TALK
               </h2>
               <div className="mt-4 hidden md:block">
                  <MagneticButton className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110 hover:bg-blue-700">
                     <span className="text-lg font-bold">Email Me</span>
                  </MagneticButton>
               </div>
            </div>

            <div className="flex w-full items-end justify-between border-t border-white/10 pt-10 text-zinc-500">
               <div className="flex flex-col gap-2">
                  <span className="uppercase tracking-widest text-white">Socials</span>
                  <a href="#" className="hover:text-white">Instagram</a>
                  <a href="#" className="hover:text-white">LinkedIn</a>
                  <a href="#" className="hover:text-white">Twitter / X</a>
               </div>
               <div className="flex flex-col gap-2 text-right">
                  <span className="uppercase tracking-widest text-white">Location</span>
                  <p>San Francisco, CA</p>
                  <p>Global Remote</p>
               </div>
               <h3 className="text-[12vw] font-bold leading-none text-zinc-800 mix-blend-difference opacity-50">DS®</h3>
            </div>
         </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3500); // Wait for preloader
  }, []);

  return (
    <ReactLenis root>
      <div className="bg-zinc-950 selection:bg-blue-500/30">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>

        {/* Navbar */}
        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-difference">
           <div className="text-xl font-bold text-white tracking-tighter">DeveloperStudios®</div>
           <div className="hidden items-center gap-8 md:flex">
             {["Work", "About", "Services", "Contact"].map((link) => (
                <MagneticButton key={link} className="px-4 py-2">
                   <span className="text-sm font-medium uppercase tracking-widest text-white hover:text-zinc-300">
                      {link}
                   </span>
                </MagneticButton>
             ))}
           </div>
        </nav>

        <Hero />
        <Philosophy />
        <Work />
        <Services />
        <Footer />
      </div>
    </ReactLenis>
  );
}