"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ArrowUpRight, Check, Menu, MoveRight, Play, X } from "lucide-react";

// --- SHARED UTILS ---
const GridLines = () => (
  <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-4 sm:px-12 opacity-20">
    <div className="h-full w-[1px] bg-zinc-800" />
    <div className="hidden h-full w-[1px] bg-zinc-800 md:block" />
    <div className="hidden h-full w-[1px] bg-zinc-800 md:block" />
    <div className="h-full w-[1px] bg-zinc-800" />
  </div>
);


const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
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
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- SECTIONS ---

// HERO SECTION (Exact replica of the dark section)
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] pt-32 text-white">
      <GridLines />
      
      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        
        {/* Top Meta Data */}
        <div className="mb-20 flex justify-between text-xs font-medium uppercase tracking-widest text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Forme Studio 20-25</span>
          </div>
          <span className="hidden md:block">[ Incredible Agency ]</span>
          <span>( 1k+ People Trust Us )</span>
        </div>

        {/* Massive Headline */}
        <div className="mb-24">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-6xl font-medium leading-[0.9] tracking-tight md:text-8xl lg:text-[7.5rem]"
          >
            Simple Lines, <br />
            Bold Ideas, <br />
            <span className="text-zinc-500">Timeless Brands.</span>
          </motion.h1>
        </div>

        {/* The "Bento" Image Grid + Orange Box */}
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-0 border-t border-zinc-800">
            
            {/* Description Text (Left) */}
            <div className="col-span-1 border-r border-zinc-800 py-8 pr-8 md:py-0">
               <div className="flex h-full flex-col justify-between">
                  <div className="h-8 w-8 rounded-full border border-zinc-700 flex items-center justify-center">
                    <div className="h-1 w-1 bg-white" />
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
                    We don't just design. We strip away the noise, leaving only what matters: timeless visuals and brands that breathe.
                  </p>
               </div>
            </div>

            {/* Image 1 */}
            <motion.div style={{ y }} className="group relative col-span-1 aspect-square overflow-hidden border-r border-zinc-800">
               <img src="https://images.unsplash.com/photo-1548231229-4d6d62a3f65e?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" alt="Work" />
            </motion.div>

            {/* Image 2 */}
            <motion.div style={{ y }} className="group relative col-span-1 aspect-square overflow-hidden border-r border-zinc-800">
               <img src="https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=800&auto=format&fit=crop" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Work" />
            </motion.div>

            {/* Orange CTA Box (The signature element) */}
            <div className="group relative col-span-1 aspect-square cursor-pointer bg-[#FF4D00] p-8 transition-colors hover:bg-white hover:text-black">
                <div className="flex h-full flex-col justify-between">
                   <ArrowUpRight className="h-12 w-12 transition-transform duration-500 group-hover:rotate-45" />
                   <h3 className="text-3xl font-bold uppercase leading-none">
                      Lets <br /> Collaborate
                   </h3>
                </div>
            </div>
        </div>

        {/* Logo Ticker */}
        <div className="mt-20 border-y border-zinc-800 py-10">
           <div className="flex justify-between px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {['CloudWatch', 'Boltshift', 'Epicurious', 'Nietzsche', 'Quotient'].map((logo) => (
                 <span key={logo} className="text-xl font-bold text-white">{logo}</span>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

// WHITE SECTION (The high contrast switch)
const Manifesto = () => {
  return (
    <section className="relative w-full bg-white py-32 text-black">
       <div className="mx-auto max-w-[1400px] px-6">
          <span className="mb-10 block text-xs uppercase tracking-widest text-zinc-400">[ A Story Worth Telling ]</span>
          
          <h2 className="max-w-4xl text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl">
            Forme Create for Brands that Value — <br />
            <span className="text-zinc-400">Clarity Over Noise, Believing that Meaningful Design Begins with Intention.</span>
          </h2>

          <div className="mt-20 flex justify-end">
             <div className="relative h-[600px] w-full md:w-[80%] overflow-hidden rounded-sm bg-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop" 
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  alt="Team" 
                />
                <div className="absolute bottom-10 left-[-40px] rotate-[-90deg] text-xs font-bold uppercase tracking-widest text-black">
                   20-25® Studio
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// 2. LOGO MARQUEE (Infinite Scroll)
const Marquee = () => {
  return (
    <div className="relative z-20 w-full bg-white py-20">
       <p className="mb-10 text-center text-xs font-bold uppercase tracking-widest text-zinc-400">Trusted By Industry Leaders</p>
       <div className="flex w-full overflow-hidden">
          <motion.div 
             animate={{ x: "-50%" }}
             transition={{ duration: 20, ease: "linear", repeat: Infinity }}
             className="flex whitespace-nowrap"
          >
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-24 px-12">
                   {['Google', 'Nike', 'Linear', 'Spotify', 'Stripe', 'Arc', 'Raycast', 'Vercel'].map((brand) => (
                      <span key={brand} className="text-5xl font-bold tracking-tighter text-black/20 hover:text-black transition-colors duration-500 cursor-default">
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

// 3. SHOWREEL VIDEO
const VideoSection = () => {
   return (
      <section className="relative z-20 w-full bg-black py-32">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="mb-12 flex items-end justify-between">
               <h2 className="text-6xl font-medium leading-[0.9] tracking-tight text-white md:text-8xl">
                  Visual <br /> Storytelling.
               </h2>
               <p className="hidden max-w-sm text-sm text-zinc-400 md:block">
                  Motion defines emotion. We craft animations that guide users and create lasting impressions.
               </p>
            </div>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
               <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="h-full w-full object-cover opacity-60 transition-opacity duration-500 hover:opacity-100"
               >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
               </video>
               
               <div className="pointer-events-none absolute bottom-8 left-8">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase text-white backdrop-blur-md">
                     2025 Showreel
                  </span>
               </div>
            </div>
         </div>
      </section>
   )
}

// 4. ACCORDION SERVICES
const Services = () => {
   const [active, setActive] = useState<number | null>(0);

   const services = [
      { id: 0, title: "Art Direction", desc: "Defining the visual soul of your brand through typography, color, and composition." },
      { id: 1, title: "Web Development", desc: "Building scalable, high-performance applications using Next.js and WebGL." },
      { id: 2, title: "Interactive Design", desc: "Creating immersive digital experiences with complex micro-interactions." },
      { id: 3, title: "Brand Strategy", desc: "Positioning your product to dominate the market through data-driven insights." },
   ];

   return (
      <section className="relative z-20 min-h-screen w-full bg-white px-6 py-32 text-black sm:px-12">
         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
               <span className="mb-8 block text-xs font-bold uppercase tracking-widest text-[#FF4D00]">( What We Do )</span>
               <h2 className="text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
                  Full Service <br />
                  Digital Agency.
               </h2>
            </div>
            
            <div className="flex flex-col">
               {services.map((s) => (
                  <div 
                     key={s.id}
                     onClick={() => setActive(active === s.id ? null : s.id)} 
                     className="cursor-pointer border-b border-black/10 py-10 transition-colors hover:bg-zinc-50"
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <span className="font-mono text-xs text-zinc-400">0{s.id + 1}</span>
                           <h3 className="text-2xl font-medium md:text-4xl">{s.title}</h3>
                        </div>
                        <motion.div 
                           animate={{ rotate: active === s.id ? 45 : 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           <ArrowUpRight size={24} className="text-[#FF4D00]" />
                        </motion.div>
                     </div>
                     
                     <AnimatePresence>
                        {active === s.id && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                           >
                              <p className="mt-6 max-w-md text-lg text-zinc-500 pl-10">
                                 {s.desc}
                              </p>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

// 5. CAROUSEL/FEATURED WORK
const Work = () => {
   const works = [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548231229-4d6d62a3f65e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
   ];

   return (
      <section className="relative z-20 w-full bg-[#0a0a0a] py-32 text-white">
         <div className="mb-20 px-6 sm:px-12">
            <h2 className="text-4xl font-medium md:text-6xl">Recent Projects</h2>
         </div>

         <div className="flex gap-8 overflow-x-auto px-6 pb-12 sm:px-12 scrollbar-hide">
            {works.map((img, i) => (
               <div key={i} className="group relative min-w-[300px] md:min-w-[600px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg">
                  <img src={img} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 opacity-0 transition-opacity group-hover:opacity-100">
                     <h3 className="text-2xl font-bold">Project 0{i+1}</h3>
                     <p className="text-sm text-zinc-300">Design & Development</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}

// 6. PRICING (From previous steps, essential for agency)
const Pricing = () => {
  return (
    <section className="relative z-20 bg-white py-32 text-black">
       <div className="mx-auto max-w-[1400px] px-6">
          <h2 className="mb-12 text-4xl font-medium md:text-6xl">
             Clear Pricing. <br />
             <span className="text-zinc-400">No Hidden Costs.</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
             <div className="flex flex-col justify-between border border-zinc-200 bg-zinc-50 p-8">
                <div>
                   <h3 className="mb-4 text-3xl font-bold">$990<span className="text-sm font-normal text-zinc-500">/mo</span></h3>
                   <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2"><Check size={14} /> 1 Request / mo</li>
                      <li className="flex items-center gap-2"><Check size={14} /> Priority Support</li>
                   </ul>
                </div>
                <button className="mt-8 w-full border border-black bg-transparent py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Choose Plan</button>
             </div>

             <div className="relative flex flex-col justify-between overflow-hidden bg-[#0a0a0a] p-8 text-white">
                <div className="absolute top-0 right-0 bg-[#FF4D00] px-3 py-1 text-[10px] font-bold uppercase text-black">Popular</div>
                <div>
                   <h3 className="mb-4 text-3xl font-bold">$2,400<span className="text-sm font-normal text-zinc-500">/mo</span></h3>
                   <ul className="space-y-3 text-sm text-zinc-300">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#FF4D00]" /> Unlimited Requests</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#FF4D00]" /> Slack Channel</li>
                   </ul>
                </div>
                <button className="mt-8 w-full bg-white py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-[#FF4D00] transition-colors">Choose Plan</button>
             </div>

             <div className="flex flex-col justify-between border border-zinc-200 bg-zinc-50 p-8">
                <div>
                   <h3 className="mb-4 text-3xl font-bold">Custom</h3>
                   <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2"><Check size={14} /> Dedicated Director</li>
                      <li className="flex items-center gap-2"><Check size={14} /> Custom Scope</li>
                   </ul>
                </div>
                <button className="mt-8 w-full border border-black bg-transparent py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Contact Us</button>
             </div>
          </div>
       </div>
    </section>
  );
};

// 7. FOOTER (High-End Reveal)
const Footer = () => {
   return (
      <div className="relative z-0 h-[800px]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
         <div className="fixed bottom-0 h-[800px] w-full bg-[#0a0a0a] text-white">
            <div className="flex h-full flex-col justify-between px-6 py-20 sm:px-12">
               <div>
                  <h2 className="text-[15vw] font-bold leading-[0.8] tracking-tighter text-[#FF4D00]">
                     LETS TALK
                  </h2>
               </div>
               
               <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
                  <div className="flex gap-12 text-sm text-zinc-500">
                     <div className="flex flex-col gap-2">
                        <span className="uppercase text-white">Socials</span>
                        <a href="#" className="hover:text-[#FF4D00]">Instagram</a>
                        <a href="#" className="hover:text-[#FF4D00]">Twitter</a>
                        <a href="#" className="hover:text-[#FF4D00]">LinkedIn</a>
                     </div>
                     <div className="flex flex-col gap-2">
                        <span className="uppercase text-white">Sitemap</span>
                        <a href="#" className="hover:text-[#FF4D00]">Home</a>
                        <a href="#" className="hover:text-[#FF4D00]">Work</a>
                        <a href="#" className="hover:text-[#FF4D00]">Contact</a>
                     </div>
                  </div>
                  
                  <div className="text-right">
                     <p className="text-[10vw] font-bold leading-none text-white/5">FORME®</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default function Home() {
  return (
    <ReactLenis root>
      <div className="relative bg-[#0a0a0a] font-sans selection:bg-[#FF4D00] selection:text-white">
        
        {/* Navbar */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
           <span className="text-xl font-bold tracking-tighter">FORME®</span>
           <MagneticButton className="rounded-full bg-white/10 px-6 py-2 text-xs font-bold uppercase backdrop-blur-md hover:bg-white hover:text-black transition-colors">
              Menu
           </MagneticButton>
        </nav>

        <Hero />
        <Manifesto />
        <Marquee />
        <VideoSection />
        <Services />
        <Work />
        <Pricing />
        <Footer />
      </div>
    </ReactLenis>
  );
}