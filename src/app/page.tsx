"use client";

import { motion } from "framer-motion";
import {
  Bandage,
  Bot,
  Camera,
  Fingerprint,
  HeartPulse,
  Pill,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";

const actions = [
  {
    title: "Authenticate Yourself",
    description: "Verify via Aadhaar, Student ID, or a secure phone OTP.",
    icon: Fingerprint,
    accent: "from-sky-400/80 to-cyan-300/60",
  },
  {
    title: "Scan or Describe",
    description: "Capture the wound or type what you feel for instant context.",
    icon: Camera,
    accent: "from-purple-400/80 to-indigo-400/60",
  },
  {
    title: "AI-Assisted Guidance",
    description: "Co-pilot nurses and doctors offer step-by-step first-aid.",
    icon: Bot,
    accent: "from-emerald-400/80 to-teal-300/60",
  },
  {
    title: "See Medicines",
    description: "Unlock tailored medicine suggestions after the ₹10 fee.",
    icon: Pill,
    accent: "from-rose-400/80 to-orange-300/60",
  },
  {
    title: "Digital or Printed Receipt",
    description: "Keep a record of care instructions anywhere you go.",
    icon: ReceiptText,
    accent: "from-amber-400/80 to-yellow-300/50",
  },
  {
    title: "Buy Essentials Instantly",
    description: "Grab bandages, cotton, antiseptic gel, and more on the spot.",
    icon: Syringe,
    accent: "from-cyan-400/80 to-blue-300/60",
  },
];

const quickSteps = [
  {
    title: "Describe or Scan",
    detail: "A wound photo + short note boosts diagnostic accuracy.",
  },
  {
    title: "AI + Clinician Review",
    detail: "Smart triage syncs with nurses and on-call doctors.",
  },
  {
    title: "Guided First-Aid",
    detail: "Simple language, animations, and haptic cues walk you through.",
  },
  {
    title: "Next Best Step",
    detail: "Severe cases? We route you to the nearest doctor or hospital.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="orbital-gradient" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-4 pt-16 sm:px-8 lg:flex-row lg:items-center">
        <motion.section
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-sm text-cyan-100 shadow-lg shadow-cyan-500/20 backdrop-blur"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Welcome to the Smart Health Assistance Vending Machine!
          </motion.span>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              Your instant first-aid partner for everyday health concerns.
            </h1>
            <p className="max-w-2xl text-xl text-slate-200">
              This machine works <span className="text-cyan-300">with</span>{" "}
              doctors and nurses—never instead of them—to deliver quick, safe,
              and guided care the moment you need it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Futuristic triage flow", "Human + AI co-pilot safety"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 backdrop-blur"
                  whileHover={{ y: -6, borderColor: "rgba(103,232,249,0.8)" }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.05 }}
                >
                  {item}
                </motion.div>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-8 py-3 text-base font-semibold shadow-lg shadow-sky-500/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Tap “Get Started”
                <HeartPulse className="h-4 w-4 transition group-hover:scale-110" />
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
            </motion.button>

            <motion.button
              className="rounded-full border border-white/30 px-6 py-3 text-base font-medium text-slate-100 transition hover:border-cyan-300 hover:text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Preview the Flow
            </motion.button>
          </div>

          <p className="text-sm text-slate-300">
            Tap “Get Started” to continue.
          </p>
        </motion.section>

        <motion.section
          className="floating flex-1"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="frosted-card relative overflow-hidden rounded-[32px] p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-300">
              <ShieldCheck className="h-5 w-5 text-cyan-300" />
              Guided triage preview
            </div>

            <div className="mt-6 space-y-4">
              {quickSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-indigo-500/40 text-lg font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-300">{step.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-400/40 bg-cyan-500/10 px-5 py-4 text-sm text-cyan-100">
              Works alongside certified medical teams so you’re never alone in
              urgent moments.
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-slate-200">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Guidance fee
                </p>
                <p className="text-4xl font-semibold text-white">₹10</p>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="max-w-xs text-sm text-slate-300">
                Unlock the recommendation deck with digital, human-reviewed
                insights and ready-to-buy essentials.
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">
              One touch, total clarity
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              What you can do here
            </h2>
          </div>
          <p className="max-w-xl text-base text-slate-300">
            Your instant first-aid partner for everyday health concerns—guided
            by clinicians and powered by AI.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {actions.map(({ title, description, icon: Icon, accent }) => (
            <motion.div
              key={title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/60"
              whileHover={{ y: -6 }}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent}`}
              >
                <Icon className="h-5 w-5 text-slate-900 drop-shadow" />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-slate-300">{description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            className="frosted-card rounded-3xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-cyan-200">
              <Stethoscope className="h-5 w-5 text-cyan-300" />
              For your safety
            </div>
            <p className="mt-4 text-lg text-slate-100">
              This machine provides basic first-aid only. Severe cases are
              instantly guided to a nearby doctor or hospital.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Every recommendation is double-checked by remote medical experts.
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-cyan-200">
              <Bandage className="h-5 w-5 text-cyan-300" />
              Essentials kiosk
            </div>
            <p className="mt-4 text-lg text-slate-100">
              Buy standalone items whenever you need them.
            </p>
            <ul className="mt-4 space-y-2 text-slate-300">
              {[
                "Medical-grade bandages and sterile cotton",
                "Antiseptic wipes, gels, and sprays",
                "Reusable cold packs and skin-safe tapes",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
