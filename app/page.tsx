"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ArrowUpRight, Plus, Minus, MoveRight } from "lucide-react";

// --- UTILS & SHARED COMPONENTS ---

// 1. NOISE OVERLAY (Adds that "Film Grain" premium texture)
const Noise = () => (
  <div
    className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
    style={{
      backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      backgroundRepeat: "repeat",
    }}
  />
);

// 2. MAGNETIC BUTTON
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
    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative z-10 flex items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      {children}
    </motion.button>
  );
};

// 3. REVEAL TEXT (Text slides up from a hidden mask)
const RevealText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <div className="overflow-hidden">
      <motion.p
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
        className={className}
      >
        {text}
      </motion.p>
    </div>
  );
};

// --- SECTIONS ---

// HERO: Massive Typography + Video/Image Background
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black px-4 sm:px-12">
      <div className="flex h-full flex-col justify-end pb-20">
        <RevealText
          text="Developer"
          className="text-[14vw] font-bold uppercase leading-[0.85] tracking-tighter text-white mix-blend-difference"
        />
        <div className="flex items-end justify-between">
          <RevealText
            text="Studios."
            className="text-[14vw] font-bold uppercase leading-[0.85] tracking-tighter text-zinc-500 mix-blend-difference"
            delay={0.1}
          />
          <div className="mb-4 hidden max-w-sm text-sm font-medium text-white md:block">
            <RevealText
              text="We build digital products that refuse to be ignored. High-end engineering meets avant-garde design."
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* Abstract Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute right-[5%] top-[10%] h-[30vw] w-[25vw] overflow-hidden rounded-[2rem] opacity-60 grayscale filter"
      >
        <img
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
          alt="Abstract"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </section>
  );
};

// LOGO MARQUEE: Clean, thin lines
const Marquee = () => {
  return (
    <div className="border-y border-zinc-800 bg-black py-8">
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-24 px-12">
              {[
                "Unreal Engine",
                "Google",
                "Pentagram",
                "Nike",
                "Linear",
                "Stripe",
              ].map((brand) => (
                <span
                  key={brand}
                  className="text-2xl font-semibold uppercase tracking-widest text-zinc-600"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// SERVICES: Interactive List (Hover to reveal image)
// This solves the "Services are too less" issue by grouping them into high-level categories
const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      name: "Web & Platforms",
      details: "Next.js, React, 3D WebGL, High-Performance PWAs",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Mobile Ecosystems",
      details: "iOS (Swift), Android (Kotlin), React Native, Flutter",
      image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "AI Integration",
      details: "LLM Agents, Computer Vision, Predictive Models",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Brand Identity",
      details: "Visual Strategy, Logo Design, Motion Systems",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "SEO & Growth",
      details: "Technical Audits, Content Strategy, Lead Gen",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative min-h-screen bg-zinc-950 px-4 py-32 sm:px-12">
      <div className="mb-20 border-b border-zinc-800 pb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-blue-500">
          (02) Capabilities
        </h2>
      </div>

      <div className="relative">
        {/* Floating Image Preview */}
        <div
          className="pointer-events-none fixed left-1/2 top-1/2 z-20 hidden h-[400px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg opacity-0 transition-opacity duration-300 md:block"
          style={{ opacity: activeService !== null ? 1 : 0 }}
        >
          {services.map((s) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.name}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                activeService === s.id ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* The List */}
        <div className="flex flex-col">
          {services.map((s) => (
            <div
              key={s.id}
              onMouseEnter={() => setActiveService(s.id)}
              onMouseLeave={() => setActiveService(null)}
              className="group flex cursor-pointer items-center justify-between border-b border-zinc-800 py-12 transition-all hover:px-8 hover:bg-zinc-900/30"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-medium text-zinc-400 transition-colors group-hover:text-white md:text-6xl">
                  {s.name}
                </h3>
                <p className="text-lg text-zinc-600 group-hover:text-zinc-400">
                  {s.details}
                </p>
              </div>
              <ArrowUpRight
                size={40}
                className="text-zinc-700 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// HORIZONTAL SCROLL PROCESS (Similar to the Lumen Video)
const Process = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-zinc-100 text-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-12">
          {/* Header Card */}
          <div className="flex h-[70vh] w-[80vw] shrink-0 flex-col justify-between rounded-3xl bg-black p-12 text-white md:w-[40vw]">
            <h2 className="text-6xl font-bold leading-tight">
              Our <br /> Process
            </h2>
            <p className="max-w-xs text-xl text-zinc-400">
              How we take you from concept to market domination.
            </p>
            <div className="h-16 w-16 rounded-full bg-blue-600" />
          </div>

          {/* Steps */}
          {[
            { step: "01", title: "Discovery", desc: "We strip away the noise to find your core truth." },
            { step: "02", title: "Strategy", desc: "Data-backed roadmaps tailored to your KPI." },
            { step: "03", title: "Design", desc: "Visuals that build trust and trigger emotion." },
            { step: "04", title: "Develop", desc: "Clean, scalable code built for the future." },
            { step: "05", title: "Launch", desc: "Marketing campaigns that convert traffic." },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative flex h-[70vh] w-[80vw] shrink-0 flex-col justify-between rounded-3xl border border-zinc-300 bg-white p-12 transition-colors hover:bg-blue-50 md:w-[40vw]"
            >
              <div className="flex justify-between">
                <span className="text-8xl font-bold text-zinc-200 group-hover:text-blue-200">
                  {item.step}
                </span>
                <ArrowUpRight className="h-12 w-12 text-zinc-300 group-hover:text-blue-500" />
              </div>
              <div>
                <h3 className="mb-4 text-4xl font-bold">{item.title}</h3>
                <p className="text-xl text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// PROOF / STATS (The "Remaining Section" you asked for)
const Proof = () => {
  return (
    <section className="bg-black px-4 py-32 sm:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-5xl font-bold leading-[1.1] text-white md:text-7xl">
            We don't just build. <br />
            <span className="text-zinc-600">We scale.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[
            { num: "50+", label: "Enterprise Clients" },
            { num: "$120M", label: "Client Revenue Generated" },
            { num: "98%", label: "Retention Rate" },
            { num: "15", label: "International Awards" },
          ].map((stat, i) => (
            <div key={i} className="border-l border-zinc-800 pl-6">
              <h3 className="mb-2 text-5xl font-bold text-white">{stat.num}</h3>
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <div className="mt-32 border-t border-zinc-800 pt-20">
         <p className="text-3xl font-light leading-relaxed text-zinc-300 md:text-5xl md:leading-tight">
           "DeveloperStudios transformed our digital presence completely. The animation quality and attention to detail are unmatched in the industry. They didn't just give us a website; they gave us a brand."
         </p>
         <div className="mt-10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-zinc-700" />
            <div>
               <p className="text-lg font-bold text-white">Sarah Jenkins</p>
               <p className="text-zinc-500">CMO at FinTech Global</p>
            </div>
         </div>
      </div>
    </section>
  );
};

// SELECTED WORK (Parallax Images)
const Work = () => {
  return (
    <section className="bg-zinc-950 px-4 py-32 sm:px-12">
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <h2 className="text-6xl font-bold text-white md:text-9xl">Selected<br/>Works</h2>
        <MagneticButton className="h-24 w-24 rounded-full border border-zinc-700 bg-zinc-900 text-white hover:bg-white hover:text-black">
           View All
        </MagneticButton>
      </div>

      <div className="flex flex-col gap-20">
        {[
          {
            title: "Neon Nexus",
            cat: "Web3 Platform",
            img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600&auto=format&fit=crop",
            align: "self-start",
          },
          {
            title: "Oura Health",
            cat: "Mobile App & Data",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
            align: "self-end",
          },
          {
            title: "Vogue Italia",
            cat: "Editorial Web Design",
            img: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1600&auto=format&fit=crop",
            align: "self-start",
          },
        ].map((item, i) => (
          <div key={i} className={`flex w-full flex-col md:w-[80%] ${item.align}`}>
            <div className="group relative mb-6 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 z-10 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <img
                src={item.img}
                alt={item.title}
                className="h-[60vh] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 z-20 translate-y-full p-8 transition-transform duration-500 group-hover:translate-y-0">
                <MagneticButton className="bg-white px-6 py-3 font-bold text-black">
                  View Case Study
                </MagneticButton>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-3xl font-bold text-white">{item.title}</h3>
              <p className="text-zinc-500">{item.cat}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// FOOTER (Big CTA)
const Footer = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 pt-20 text-center">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
       
       <RevealText text="Have an idea?" className="mb-4 text-xl uppercase tracking-widest text-zinc-500" />
       <h2 className="relative z-10 mb-12 text-6xl font-bold text-white md:text-9xl">
         Let's Build <br /> The Future.
       </h2>

       <MagneticButton className="group relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:w-64">
          <span className="absolute opacity-100 transition-opacity group-hover:opacity-0">Get in touch</span>
          <span className="absolute opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-2">
             Email Us <MoveRight />
          </span>
       </MagneticButton>

       <div className="mt-auto flex w-full flex-col justify-between gap-8 border-t border-zinc-900 bg-zinc-950 p-10 md:flex-row text-zinc-600">
          <p>© 2025 DeveloperStudios.</p>
          <div className="flex gap-8">
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
       </div>
    </section>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-black font-sans selection:bg-blue-500/30">
        <Noise />
        
        {/* Navigation */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference">
          <div className="text-xl font-bold text-white tracking-tighter">DeveloperStudios®</div>
          <MagneticButton className="hidden rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-widest text-black md:block hover:bg-zinc-200">
            Start Project
          </MagneticButton>
        </nav>

        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Proof />
        <Work />
        <Footer />
      </div>
    </ReactLenis>
  );
}