"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope,
  ShoppingCart,
  Receipt,
  Settings,
  ArrowRight,
  Bandage,
  Pill,
  Shield,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const quickBuyItems = [
  { name: "Bandage", icon: Bandage },
  { name: "Cotton", icon: Bandage },
  { name: "Antiseptic", icon: Pill },
  { name: "Pain Relief Tablet", icon: Pill },
];

import { useLanguage } from "@/context/LanguageContext";

// ... imports ...

export default function DashboardPage() {
  const { t } = useLanguage();
  const [studentName, setStudentName] = useState(t("dashboard.student"));
  const [isLoadingName, setIsLoadingName] = useState(true);
  const [nameError, setNameError] = useState("");

  const dashboardSections = [
    {
      title: t("dashboard.healthAnalysis.title"),
      description: t("dashboard.healthAnalysis.desc"),
      icon: Stethoscope,
      buttonText: t("dashboard.healthAnalysis.btn"),
      href: "/en/health-analysis",
      accent: "from-cyan-400/80 to-blue-500/60",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: t("dashboard.quickBuy.title"),
      description: t("dashboard.quickBuy.desc"),
      icon: ShoppingCart,
      buttonText: t("dashboard.quickBuy.btn"),
      href: "/en/quick-buy",
      accent: "from-emerald-400/80 to-teal-500/60",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: t("dashboard.history.title"),
      description: t("dashboard.history.desc"),
      icon: Receipt,
      buttonText: t("dashboard.history.btn"),
      href: "/en/history",
      accent: "from-amber-400/80 to-orange-500/60",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      title: t("dashboard.settings.title"),
      description: t("dashboard.settings.desc"),
      icon: Settings,
      buttonText: t("dashboard.settings.btn"),
      href: "/en/settings",
      accent: "from-purple-400/80 to-indigo-500/60",
      gradient: "from-purple-500/20 to-indigo-500/20",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedName = sessionStorage.getItem("studentFirstName");
    if (storedName) {
      setStudentName(storedName);
      setIsLoadingName(false);
      return;
    }

    const storedId = sessionStorage.getItem("studentId");
    if (!storedId) {
      setIsLoadingName(false);
      return;
    }

    const controller = new AbortController();

    const fetchStudentName = async () => {
      try {
        setIsLoadingName(true);
        setNameError("");

        const response = await fetch(
          `/api/student-profile/${encodeURIComponent(storedId)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || t("error.fetchFailed"));
        }

        const data = await response.json();
        if (data.firstName) {
          setStudentName(data.firstName);
          sessionStorage.setItem("studentFirstName", data.firstName);
        } else if (data.success === false) {
          setNameError(t("error.studentNotFound"));
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Failed to fetch student name:", error);
        if (error instanceof Error) {
          // If the error message matches a key, it will be translated, otherwise show generic
          setNameError(t("error.fetchFailed"));
        } else {
          setNameError(t("error.fetchFailed"));
        }
      } finally {
        setIsLoadingName(false);
      }
    };

    fetchStudentName();

    return () => controller.abort();
  }, [t]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="orbital-gradient" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {t("dashboard.welcome")}, {isLoadingName ? "..." : studentName || t("dashboard.student")}!
              </h1>
              <p className="text-sm text-slate-400">{t("dashboard.signedIn")}</p>
              {nameError && (
                <p className="text-xs text-amber-400">{nameError}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-slate-100">
              {t("dashboard.ready")}
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {t("dashboard.choose")}
            </p>
          </motion.div>
        </motion.header>

        {/* Main Sections */}
        <div className="space-y-6">
          {dashboardSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="frosted-card rounded-3xl border border-white/10 p-6 sm:p-8 transition hover:border-cyan-300/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/* Icon */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${section.accent} shadow-lg`}
                >
                  <section.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <p className="text-slate-300">{section.description}</p>

                  {/* Quick Buy Items List */}
                  {section.title === t("dashboard.quickBuy.title") && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {quickBuyItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.name}
                            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-300"
                            whileHover={{ scale: 1.05, borderColor: "rgba(103,232,249,0.5)" }}
                          >
                            <Icon className="h-4 w-4 text-cyan-400" />
                            <span>{item.name}</span>
                          </motion.div>
                        );
                      })}
                      <motion.div
                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-300"
                        whileHover={{ scale: 1.05, borderColor: "rgba(103,232,249,0.5)" }}
                      >
                        <span>+ More items</span>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Button */}
                <Link href={section.href}>
                  <motion.button
                    className={`group flex items-center gap-2 rounded-full bg-gradient-to-r ${section.accent} px-6 py-3 font-semibold text-white shadow-lg transition`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{section.buttonText}</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Notes */}
        <motion.footer
          className="mt-12 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-2">
              <p>
                {t("dashboard.footer.note")}
              </p>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <p>
                  {t("dashboard.footer.privacy")}
                </p>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
