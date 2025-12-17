// src/pages/Home.jsx
// LOGIC & COLORS UNCHANGED – UI/UX POLISH ONLY
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLOGANS = [
  "Custom-built rigs for work, study, and play.",
  "Genuine parts. Reliable service. Zero drama.",
  "From student laptops to pro workstations — we’ve got you."
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/homepage.jpg')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-accent/50 to-accent/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-6xl flex-col justify-center px-4 py-12 md:flex-row md:items-center md:gap-12">
        {/* Left: Hero copy */}
        <div className="w-full text-center md:w-1/2 md:text-left space-y-7">
          <p className="text-s font-semibold uppercase tracking-[0.35em] text-cyan-300">
            I-Computers
          </p>

          <h1 className="text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">
            Upgrade your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              tech game
            </span>{' '}
            with trusted hardware & service.
          </h1>

          {/* Animated slogan */}
          <p className="min-h-[2.5rem] text-base sm:text-lg font-medium text-cyan-100 transition-all duration-500">
            {SLOGANS[activeIndex]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-cyan-500/30 transition hover:bg-cyan-400 hover:-translate-y-0.5"
            >
              Shop Products
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-500/70 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 backdrop-blur-md transition hover:border-cyan-400 hover:bg-white/10"
            >
              Learn About Us
            </Link>
          </div>

          {/* Quick value props */}
          <div className="mt-8 grid w-full gap-4 text-sm text-slate-100 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Laptops & Desktops
              </p>
              <p className="mt-1 text-sm font-semibold">Branded & Custom Builds</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Repairs & Upgrades
              </p>
              <p className="mt-1 text-sm font-semibold">SSD, RAM & Diagnostics</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Support
              </p>
              <p className="mt-1 text-sm font-semibold">Friendly Expert Guidance</p>
            </div>
          </div>
        </div>

        {/* Right: Highlight cards */}
        <div className="mt-12 w-full md:mt-0 md:w-1/2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md transition hover:scale-[1.02]">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Hot Right Now
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Student & Work-from-Home Packs
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Smooth performance for study, Zoom, and daily tasks.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-5 backdrop-blur-md transition hover:scale-[1.02]">
              <p className="text-xs uppercase tracking-wide text-cyan-300">
                Gaming & Creators
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                High FPS, Low Latency Builds
              </p>
              <p className="mt-1 text-xs text-cyan-100">
                RTX GPUs, fast SSDs, and tuned airflow.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Service Promise
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                Transparent pricing, genuine parts, and clear communication.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <Link to="/contact" className="text-cyan-300 hover:underline">
                  Talk to our team
                </Link>
                <span className="text-slate-500">•</span>
                <Link to="/orders" className="text-slate-200 hover:underline">
                  Track your orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
