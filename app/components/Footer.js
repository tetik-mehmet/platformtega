"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-r from-blue-50/90 via-blue-100/90 to-orange-100/90 dark:bg-gray-900/80 border-t border-blue-200/40 dark:border-gray-700/40 shadow-sm w-full py-2 text-center text-gray-800 dark:text-gray-200 font-medium fixed bottom-0 left-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-1 md:mb-0">
          <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Hızlı Okuma Uygulaması
          </span>
          <span className="block text-[8px] text-gray-600 dark:text-gray-400 mt-0.5">
            © {new Date().getFullYear()} Mehmet tarafından geliştirildi.
          </span>
        </div>
        <div className="flex space-x-3">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-colors duration-300 p-0.5 rounded-full hover:bg-blue-50/50"
            title="X (Twitter)"
          >
            {/* X (Twitter) */}
            <svg
              className="w-3 h-3"
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
            className="text-gray-500 hover:text-blue-600 transition-colors duration-300 p-0.5 rounded-full hover:bg-blue-50/50"
            title="Facebook"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
            </svg>
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-orange-500 transition-colors duration-300 p-0.5 rounded-full hover:bg-orange-50/50"
            title="Instagram"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.388 3.635 1.355 2.668 2.322 2.41 3.495 2.352 4.772.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.277.316 2.45 1.283 3.417.967.967 2.14 1.225 3.417 1.283C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.316 3.417-1.283.967-.967 1.225-2.14 1.283-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.277-.316-2.45-1.283-3.417-.967-.967-2.14-1.225-3.417-1.283C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
