"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OyunKategoriPage() {
  const [userName, setUserName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Kullanıcının giriş yapıp yapmadığını kontrol et
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Kullanıcı adını al
    const name = localStorage.getItem("userName");
    const surname = localStorage.getItem("userSurname");
    setUserName(`${name} ${surname}`);

    // Sayfa yüklendiğinde animasyonu başlat
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    router.push("/login");
  };

  const oyunKategorileri = [
    {
      id: 1,
      title: "Hafıza Kartları",
      description: "Hafızanızı güçlendirin ve konsantrasyonunuzu artırın",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      link: "/oyun",
      color: "blue",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/30",
      glow: "shadow-blue-500/50",
    },
    {
      id: 2,
      title: "Bilmeceler",
      description:
        "Mantıksal düşünme becerilerinizi geliştirin ve problem çözün",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      link: "/bilmece",
      color: "green",
      gradient: "from-green-500 via-green-600 to-emerald-600",
      shadow: "shadow-green-500/30",
      glow: "shadow-green-500/50",
    },
    {
      id: 3,
      title: "Doğru Şekil",
      description: "Görsel algınızı geliştirin ve detayları yakalayın",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      link: "/dogru-sekil",
      color: "purple",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      shadow: "shadow-purple-500/30",
      glow: "shadow-purple-500/50",
    },
    {
      id: 4,
      title: "Puzzle",
      description: "Parçaları birleştirin ve resmi tamamlayın",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      link: "/puzzle",
      color: "orange",
      gradient: "from-orange-500 via-orange-600 to-red-600",
      shadow: "shadow-orange-500/30",
      glow: "shadow-orange-500/50",
    },
    {
      id: 5,
      title: "Labirent",
      description: "Yolu bulun ve çıkışa ulaşın",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"
          />
        </svg>
      ),
      link: "/labirent",
      color: "teal",
      gradient: "from-teal-500 via-teal-600 to-cyan-600",
      shadow: "shadow-teal-500/30",
      glow: "shadow-teal-500/50",
    },
    {
      id: 6,
      title: "Noktaları Bulalım",
      description: "Gizli noktaları bulun ve görsel algınızı geliştirin",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      link: "/noktalari-bulalim",
      color: "pink",
      gradient: "from-pink-500 via-pink-600 to-rose-600",
      shadow: "shadow-pink-500/30",
      glow: "shadow-pink-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating 3D Spheres */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse blur-xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-28 h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse blur-xl"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <main className="relative z-10 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* 3D Header */}
          <div
            className={`flex justify-between items-center mb-16 transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-black text-white drop-shadow-2xl">
                Oyun Kategorileri
              </h1>
              <p className="text-xl text-white/80">
                Eğlenceli oyunlarla becerilerinizi geliştirin!
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/genel"
                className="group relative px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10">Geri Dön</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button
                onClick={handleLogout}
                className="group relative px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
              >
                <span className="relative z-10">Çıkış Yap</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* 3D Oyun Kategorileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oyunKategorileri.map((kategori, index) => (
              <Link
                key={kategori.id}
                href={kategori.link}
                className={`group block transition-all duration-1000 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-[400px] perspective-1000">
                  {/* 3D Card Container */}
                  <div className="relative w-full h-full transform-style-preserve-3d transition-all duration-700 group-hover:rotate-y-12 group-hover:rotate-x-5">
                    {/* Main Card Face */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${kategori.gradient} rounded-3xl p-6 shadow-2xl ${kategori.shadow} group-hover:${kategori.glow} transition-all duration-500 transform group-hover:-translate-y-4 group-hover:scale-105`}
                    >
                      {/* 3D Depth Layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-black/10 to-transparent rounded-2xl"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-6 h-full">
                        {/* 3D Icon Container */}
                        <div className="relative">
                          <div
                            className={`p-6 rounded-3xl bg-gradient-to-r ${kategori.gradient} shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-2`}
                          >
                            <div className="text-white drop-shadow-lg">
                              {kategori.icon}
                            </div>
                          </div>
                          {/* Icon Glow Effect */}
                          <div
                            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${kategori.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                          ></div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg group-hover:text-white transition-colors duration-300">
                            {kategori.title}
                          </h3>
                          <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                            {kategori.description}
                          </p>
                        </div>

                        {/* 3D Button */}
                        <div className="w-full">
                          <div
                            className={`relative w-full py-4 px-6 rounded-2xl bg-white/20 backdrop-blur-md text-white font-bold text-center group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 overflow-hidden border border-white/30`}
                          >
                            <span className="relative z-10">Oyna</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>
                        </div>
                      </div>

                      {/* 3D Corner Decorations */}
                      <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
                      <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/20 rounded-full blur-sm"></div>
                    </div>

                    {/* Card Shadow */}
                    <div className="absolute inset-0 bg-black/20 rounded-3xl transform translate-y-4 blur-xl group-hover:translate-y-6 transition-transform duration-500"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
