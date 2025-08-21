"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // Kullanıcı girişli mi? (örnek için elle değiştir)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Body'ye dark class'ı ekle/çıkar
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); // 40px sonrası blur başlasın
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bildirim sayısı (örnek)
  const notificationCount = 3;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="backdrop-blur-md bg-gradient-to-r from-blue-50/90 via-blue-100/90 to-orange-100/90 dark:bg-gray-900/80 border-b border-blue-200/40 dark:border-gray-700/40 shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className={`flex items-center transition-all duration-300 ${
              isScrolled ? "blur-sm opacity-70" : ""
            }`}
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">
                HızlıOkuma
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center space-x-6 transition-all duration-300 ${
              isScrolled ? "blur-sm opacity-70" : ""
            }`}
          >
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-base tracking-wide"
            >
              Ana Sayfa
            </Link>

            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
            >
              İletişim
            </Link>
            {/* Giriş Yap ve Üye Ol butonları ayrı grupta ve görsel olarak farklı */}
            <div className="flex items-center space-x-2 ml-8">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg border border-amber-300/60 dark:border-amber-600/60 bg-amber-50/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-sm font-medium shadow-sm hover:bg-amber-100/90 dark:hover:bg-amber-800/60 hover:border-amber-400/80 dark:hover:border-amber-500/80 transition-all duration-300 backdrop-blur-sm hover:shadow-md"
              >
                Giriş Yap
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium shadow-sm hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Üye Ol
              </Link>
            </div>
          </nav>

          {/* Sağ üst: Sosyal Medya İkonları */}
          <div
            className={`hidden md:flex items-center space-x-4 transition-all duration-300 ${
              isScrolled ? "blur-sm opacity-70" : ""
            }`}
          >
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors"
              title="X (Twitter)"
            >
              {/* X (Twitter) yeni logo */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 1200 1227"
                fill="currentColor"
              >
                <path d="M1199.61 0H950.13L599.8 464.13L249.87 0H0L491.13 661.13L0 1227H249.87L599.8 762.87L950.13 1227H1200L708.87 565.87L1199.61 0ZM899.87 1117.13L599.8 715.87L299.87 1117.13H134.13L599.8 505.87L1065.87 1117.13H899.87ZM299.87 109.87L599.8 511.13L899.87 109.87H1065.87L599.8 721.13L134.13 109.87H299.87Z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors"
              title="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-600 transition-colors"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/40 dark:bg-gray-800/60 hover:bg-white/70 dark:hover:bg-gray-700/80 transition-colors border border-white/30 dark:border-gray-700"
              title="Karanlık Mod"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 dark:bg-gray-900/90 border border-white/30 dark:border-gray-800/60 rounded-lg mt-2 backdrop-blur-md">
              <Link
                href="/"
                className="block text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="block text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
              <Link
                href="/login"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="block text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 px-4 py-2 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Üye Ol
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
