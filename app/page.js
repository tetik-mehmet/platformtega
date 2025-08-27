"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, Lightbulb, Brain, Target, Zap, Star } from "lucide-react";

export default function Home() {
  // Uçuşan ikonlar için simetrik animasyon varyantları
  const floatingIcons = [
    { icon: BookOpen, delay: 0, duration: 4, x: -200, y: -150 },
    { icon: Lightbulb, delay: 0.8, duration: 4.5, x: 200, y: -150 },
    { icon: Brain, delay: 1.6, duration: 5, x: -200, y: 150 },
    { icon: Target, delay: 2.4, duration: 4.2, x: 200, y: 150 },
    { icon: Zap, delay: 3.2, duration: 4.8, x: 0, y: -200 },
    { icon: Star, delay: 4, duration: 4.3, x: 0, y: 200 },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-orange-100 flex flex-col items-center justify-center p-6 text-gray-800 overflow-hidden relative">
      {/* Uçuşan ikonlar */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: [0, 0.8, 0.6, 0],
                x: [0, item.x, item.x + 40, item.x],
                y: [0, item.y, item.y - 40, item.y],
                scale: [0.3, 1, 1.2, 1],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <IconComponent
                size={40}
                className="text-orange-500 drop-shadow-lg"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Ana içerik - doğrudan görünür */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-center mb-10 font-sans"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-base md:text-lg font-semibold uppercase text-orange-600 mb-3 tracking-wide"
          style={{ letterSpacing: "0.08em" }}
        >
          Daha hızlı oku, daha çok anla, zamandan tasarruf et!
        </motion.p>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <Image
            src="/guncellogo.png"
            alt="TEGA Akademi Logo"
            width={120}
            height={120}
            className="drop-shadow-2xl filter brightness-110 rounded-3xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl text-orange-600 font-bold text-gray-900 mb-2"
        >
          TEGA AKADEMİ DİJİTAL EĞİTİM PLATFORMU
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 text-base max-w-md mx-auto text-gray-600"
        >
          Hızlı okuma becerinizi sade ve etkili alıştırmalarla geliştirin.
        </motion.p>
      </motion.div>

      {/* Giriş butonu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {/* Giriş bilgisi yazısı */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm text-gray-600 mb-4 text-center max-w-sm mx-auto"
        >
          Size verilen parolayla ve e-posta adresinizle giriş yapın
        </motion.p>

        <Link href="/login">
          <motion.button
            className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-orange-500/25 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50 group overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Arka plan animasyonu */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
            />

            {/* Buton içeriği */}
            <span className="relative z-10 flex items-center justify-center gap-3">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
              Giriş Yap
            </span>

            {/* Parlama efekti */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
              initial={{ x: "-100%", skewX: "-15deg" }}
              whileHover={{ x: "200%", skewX: "-15deg" }}
              transition={{ duration: 0.7 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
