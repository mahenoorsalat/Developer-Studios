"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useInView
} from "framer-motion";
import { ReactLenis, useLenis } from 'lenis/react'
import { 
  ArrowRight, Menu, X, Check, Plus, Minus, 
  Twitter, Linkedin, Instagram, ArrowUpRight,
  Zap, Globe, Cpu, Layout
} from "lucide-react";
import Link from "next/link";

// --- ADVANCED ANIMATION COMPONENTS ---

// 1. SPLIT TEXT REVEAL (The "Awwwards" Text Effect)
const TextReveal = ({ children, className = "", delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = children.split(" ");

  return (
    <span ref={ref} className={`inline-block overflow-hidden leading-tight ${className}`}>
      {words.map((word: string, i: number) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: delay + (i * 0.03), 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// 2. MAGNETIC BUTTON
const MagneticButton = ({ children, className = "", onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.5);
    y.set((clientY - centerY) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-full" />
    </motion.button>
  );
};

// --- SECTIONS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter z-50 relative">
          ARQOS<span className="text-neutral-500">®</span>
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
          {["Services", "Work", "Process", "Pricing"].map((item) => (
            <button 
              key={item} 
              onClick={() => lenis?.scrollTo(`#${item.toLowerCase()}`)}
              className="hover:text-neutral-400 transition-colors uppercase tracking-widest text-xs"
            >
              {item}
            </button>
          ))}
          <MagneticButton className="border border-white/30 px-6 py-2 rounded-full uppercase text-xs tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors">
            Start Project
          </MagneticButton>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 text-5xl font-light tracking-tighter"
          >
            {["Services", "Work", "Process", "Pricing"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                <Link href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 overflow-hidden">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      {/* Animated Orbs */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />

      <div className="max-w-7xl mx-auto w-full z-10 mt-20">
        <div className="flex items-center gap-3 mb-8">
          <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Open for March 2025</span>
          </motion.div>
        </div>
        
        <div className="text-[11vw] md:text-[8.5vw] font-medium leading-[0.85] tracking-tighter mb-10 mix-blend-difference text-white">
          <div className="flex items-center gap-4">
             <TextReveal>DIGITAL</TextReveal>
             <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "auto" }} 
               transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
               className="h-[10px] md:h-[24px] bg-white block mt-2 md:mt-4 grow max-w-[200px]" 
             />
          </div>
          <div><TextReveal delay={0.1}>EVOLUTION</TextReveal></div>
          <div className="flex items-start text-neutral-500">
             <TextReveal delay={0.2}>AGENCY</TextReveal>
             <span className="text-lg md:text-3xl mt-2 md:mt-4">®</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/20 pt-8"
        >
          <p className="max-w-md text-lg text-neutral-400 leading-relaxed">
            We architect digital products that merge <span className="text-white">AI-driven efficiency</span> with <span className="text-white">human aesthetic precision</span>.
          </p>
          <MagneticButton className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium flex items-center gap-3 hover:bg-neutral-200 transition-colors">
            View Case Studies <ArrowRight className="-rotate-45" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

const LogoMarquee = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-black overflow-hidden relative">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black pointer-events-none w-full" />
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex gap-24 w-max items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {["Acme Corp", "SaaS Flow", "NextGen AI", "Vercel", "Stripe", "Framer", "Linear", "Raycast"].map((logo, idx) => (
              <span key={idx} className="text-3xl font-bold tracking-tighter text-neutral-400">{logo}</span>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Process = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  const steps = [
    { title: "Discovery", desc: "We deep dive into your business model, identifying bottlenecks that AI can solve." },
    { title: "Strategy", desc: "Building a roadmap that combines brand positioning with automated workflows." },
    { title: "Design", desc: "High-fidelity UI/UX crafted in Figma, enhanced by generative design tools." },
    { title: "Development", desc: "Pixel-perfect implementation using Next.js, Framer Motion, and scalable backends." }
  ];

  return (
    <section id="process" ref={container} className="relative h-[300vh] bg-neutral-950">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          <div className="relative z-10">
            <h2 className="text-sm font-mono text-neutral-500 mb-6 uppercase tracking-widest">Our Methodology</h2>
            <TextReveal className="text-5xl md:text-7xl font-medium mb-12 block">The Arqos Framework.</TextReveal>
            
            {steps.map((step, i) => {
              const start = i * 0.25;
              const end = start + 0.25;
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.2, 1, 1, 0.2]);
              const x = useTransform(scrollYProgress, [start, start + 0.1], [50, 0]);

              return (
                <motion.div key={i} style={{ opacity, x }} className="mb-12">
                  <span className="text-sm font-mono text-blue-500 mb-2 block">0{i+1}</span>
                  <h4 className="text-3xl font-medium mb-3 text-white">{step.title}</h4>
                  <p className="text-neutral-400 max-w-sm text-lg">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="relative h-[500px] w-full bg-neutral-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20" />
             <Cpu size={120} className="text-white/10 animate-pulse" />
             <motion.div style={{ scaleY: scrollYProgress }} className="absolute right-6 top-6 bottom-6 w-1 bg-white/10 origin-top">
                <div className="w-full h-full bg-blue-500" />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SelectedWork = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const projects = [
    { name: "Apex Finance", cat: "Fintech App", color: "bg-blue-600" },
    { name: "Chronos", cat: "SaaS Dashboard", color: "bg-purple-600" },
    { name: "Lumina", cat: "AI Interface", color: "bg-orange-600" },
    { name: "Velvet", cat: "Fashion E-com", color: "bg-rose-600" }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get relative coordinates for image positioning
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto" onMouseMove={handleMouseMove}>
      <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-6">
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
          <TextReveal>Selected Work</TextReveal>
        </h2>
        <span className="text-neutral-500 hidden md:block">(2024 — 2025)</span>
      </div>

      <div className="flex flex-col relative">
        {projects.map((p, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative flex flex-col md:flex-row justify-between items-center py-16 border-b border-white/10 cursor-pointer transition-colors hover:bg-white/5 px-6 z-10"
          >
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight z-10 transition-transform duration-500 group-hover:translate-x-4">
              {p.name}
            </h3>
            <div className="flex items-center gap-12 z-10">
              <span className="text-neutral-500 uppercase tracking-widest text-xs group-hover:text-white transition-colors">{p.cat}</span>
              <div className="p-3 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        ))}

        {/* Floating Image Reveal - Follows Mouse loosely or center of container */}
        <AnimatePresence>
          {hoveredProject !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                // Simple centering logic, typically you'd use the mouse coordinates for a "cursor follower"
                // But for this layout, fixed center with rotation is cleaner
                rotate: -5
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-2xl pointer-events-none z-0 ${projects[hoveredProject].color} blur-[60px] opacity-40`}
            />
          )}
        </AnimatePresence>
        
        {/* Actual Image container (Simulated) */}
        <AnimatePresence>
          {hoveredProject !== null && (
             <motion.div
               style={{ 
                 top: "50%", 
                 left: "50%",
                 x: "-50%",
                 y: "-50%" 
                }}
               initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               exit={{ opacity: 0, scale: 0.5, rotate: -10 }}
               transition={{ duration: 0.4 }}
               className={`fixed pointer-events-none z-20 w-[500px] h-[350px] bg-neutral-800 rounded-lg overflow-hidden border border-white/10 shadow-2xl hidden md:block`}
             >
                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-700 font-bold text-5xl tracking-tighter">
                   {projects[hoveredProject].name}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Services = () => {
    return (
        <section id="services" className="py-32 px-6 bg-neutral-900/20 border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <span className="text-blue-500 font-mono text-sm mb-4 block">WHAT WE DO</span>
                        <h2 className="text-4xl md:text-5xl font-medium mb-6"><TextReveal>Full-cycle digital production.</TextReveal></h2>
                        <p className="text-neutral-400 leading-relaxed mb-8">
                            We don't just design; we build systems. From the first pixel to the final deploy, our process is optimized for speed and scalability.
                        </p>
                        <MagneticButton className="px-6 py-3 border border-white/20 rounded-full text-sm">
                            More about Services
                        </MagneticButton>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: "UI/UX Design", icon: <Layout />, desc: "Interfaces that feel alive. Micro-interactions and fluid motion." },
                            { title: "Web Development", icon: <Globe />, desc: "Next.js & Webflow implementations that rank high and load fast." },
                            { title: "Brand Identity", icon: <Zap />, desc: "Visual systems that cut through the noise of the modern web." },
                            { title: "AI Automation", icon: <Cpu />, desc: "Custom workflows to automate your content and asset generation." }
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 0.98, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="p-8 bg-black border border-white/10 rounded-2xl transition-all duration-300 group"
                            >
                                <div className="mb-6 p-3 bg-white/5 w-fit rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">{s.icon}</div>
                                <h3 className="text-xl font-medium mb-3">{s.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const Pricing = () => {
    const plans = [
        { name: "Sprint", price: "$4,500", desc: "One-off project", feat: ["Branding or Web Design", "2 Weeks Delivery"] },
        { name: "Retainer", price: "$7,500", desc: "Ongoing partnership", feat: ["Unlimited Requests", "Priority Support", "Slack Channel"], rec: true },
        { name: "Enterprise", price: "Custom", desc: "Full scale production", feat: ["Dedicated Team", "Full Stack Dev", "24/7 Support"] }
    ]
    
    return (
        <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
             <h2 className="text-center text-4xl font-medium mb-20"><TextReveal>Investment</TextReveal></h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((p, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-8 rounded-3xl border flex flex-col justify-between min-h-[400px] relative ${p.rec ? 'bg-white text-black border-transparent' : 'bg-black border-white/10 hover:border-white/30 transition-colors'}`}
                    >
                        {p.rec && <div className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded">POPULAR</div>}
                        <div>
                            <h3 className="text-xl font-medium mb-2">{p.name}</h3>
                            <p className={`text-sm mb-8 ${p.rec ? 'text-neutral-600' : 'text-neutral-500'}`}>{p.desc}</p>
                            <div className="text-4xl font-bold mb-8">{p.price}</div>
                            <ul className="space-y-4 mb-8">
                                {p.feat.map((f, fi) => (
                                    <li key={fi} className="flex items-center gap-3 text-sm">
                                        <Check size={14} /> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <MagneticButton className={`w-full py-4 rounded-full font-medium ${p.rec ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            Book Call
                        </MagneticButton>
                    </motion.div>
                ))}
             </div>
        </section>
    )
}

const CTA = () => {
    return (
        <section className="py-40 px-6 bg-gradient-to-b from-black to-neutral-900 text-center border-t border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-5xl md:text-9xl font-semibold tracking-tighter mb-8 leading-[0.9]">
                   <TextReveal>Ready to</TextReveal><br />
                   <TextReveal delay={0.2}>Scale Up?</TextReveal>
                </div>
                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">We only take on 3 new clients per quarter to ensure premium quality delivery.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <MagneticButton className="px-12 py-6 bg-white text-black rounded-full text-xl font-medium">
                        Book a Discovery Call
                    </MagneticButton>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-black py-12 px-6 border-t border-white/10 text-neutral-500 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p>Arqos Studio © 2025</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                </div>
            </div>
        </footer>
    )
}

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
        <Navbar />
        <Hero />
        <LogoMarquee />
        <Services />
        <Process />
        <SelectedWork />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </ReactLenis>
  );
}