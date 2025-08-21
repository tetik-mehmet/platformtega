"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GenelPage() {
  const [userName, setUserName] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("🔍 Genel sayfası useEffect başladı");

    // GEÇİCİ: Login kontrollerini kaldır
    console.log("⚠️ GEÇİCİ: Login kontrolleri kaldırıldı");

    // Kullanıcı adını localStorage'dan al (eğer varsa)
    try {
      const name = localStorage.getItem("userName");
      const surname = localStorage.getItem("userSurname");

      if (name && surname) {
        setUserName(`${name} ${surname}`);
      } else {
        // Eğer localStorage'da yoksa varsayılan değer
        setUserName("Kullanıcı");
      }
    } catch (error) {
      console.error("User data error:", error);
      setUserName("Kullanıcı");
    }

    // 2 saniye sonra kartları kapat
    setTimeout(() => {
      setShowCards(false);
    }, 2000);
  }, []); // router dependency'yi kaldırın

  const handleLogout = () => {
    // GEÇİCİ: Logout işlemini basitleştir
    console.log("⚠️ GEÇİCİ: Logout işlemi basitleştirildi");
    router.push("/login");
  };

  const programs = [
    {
      id: 1,
      title: "Hızlı Okuma Programı",
      description: "Okuma hızınızı artırın ve anlama kapasitenizi geliştirin",
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
      link: "/panel",
      color: "orange",
      gradient: "from-orange-500 via-orange-600 to-red-600",
      shadow: "shadow-orange-500/30",
      glow: "shadow-orange-500/50",
    },
    {
      id: 2,
      title: "Temel İngilizce Programı",
      description: "İngilizce dil becerilerinizi temel seviyeden geliştirin",
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
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
      link: "/ingilizce",
      color: "blue",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      shadow: "shadow-blue-500/30",
      glow: "shadow-blue-500/50",
    },
    {
      id: 3,
      title: "Odak Programı",
      description: "Konsantrasyon ve odaklanma becerilerinizi geliştirin",
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
      link: "/odak",
      color: "green",
      gradient: "from-green-500 via-green-600 to-emerald-600",
      shadow: "shadow-green-500/30",
      glow: "shadow-green-500/50",
    },
    {
      id: 4,
      title: "Ekstra Oyunlar",
      description: "Eğlenceli oyunlarla becerilerinizi geliştirin ve eğlenin",
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      link: "/oyunkategori",
      color: "purple",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      shadow: "shadow-purple-500/30",
      glow: "shadow-purple-500/50",
    },
    {
      id: 5,
      title: "Kitap Önerileri",
      description:
        "Okuma seviyenize uygun kitaplar keşfedin ve okuma listesi oluşturun",
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
      link: "/kitap-onerileri",
      color: "amber",
      gradient: "from-amber-500 via-yellow-600 to-orange-600",
      shadow: "shadow-amber-500/30",
      glow: "shadow-amber-500/50",
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
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
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
                Hoş Geldiniz,{" "}
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  {userName}!
                </span>
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
            >
              <span className="relative z-10">Çıkış Yap</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* 3D Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {programs.map((program, index) => (
              <Link
                key={program.id}
                href={program.link}
                className={`group block transition-all duration-1000 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } cursor-pointer`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-[500px] perspective-1000">
                  {/* 3D Card Container */}
                  <div className="relative w-full h-full transform-style-preserve-3d transition-all duration-700 group-hover:rotate-y-12 group-hover:rotate-x-5">
                    {/* Main Card Face */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${program.gradient} rounded-3xl p-8 shadow-2xl ${program.shadow} group-hover:${program.glow} group-hover:-translate-y-6 group-hover:scale-105 transition-all duration-500 transform`}
                    >
                      {/* 3D Depth Layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-black/10 to-transparent rounded-2xl"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-8 h-full">
                        {/* 3D Icon Container */}
                        <div className="relative">
                          <div
                            className={`p-8 rounded-3xl bg-gradient-to-r ${program.gradient} shadow-2xl group-hover:shadow-3xl group-hover:scale-110 group-hover:rotate-6 group-hover:-translate-y-2 transition-all duration-500 transform`}
                          >
                            <div className="text-white drop-shadow-lg">
                              {program.icon}
                            </div>
                          </div>
                          {/* Icon Glow Effect */}
                          <div
                            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${program.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
                          ></div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                          <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:text-white transition-colors duration-300">
                            {program.title}
                          </h3>
                          <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300 text-lg">
                            {program.description}
                          </p>
                        </div>

                        {/* 3D Button */}
                        <div className="w-full">
                          <div className="relative w-full py-5 px-8 rounded-2xl bg-white/20 group-hover:shadow-2xl group-hover:scale-105 backdrop-blur-md text-white font-bold text-center transition-all duration-500 transform overflow-hidden border border-white/30">
                            <span className="relative z-10">Başla</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>
                        </div>
                      </div>

                      {/* 3D Corner Decorations */}
                      <div className="absolute top-6 right-6 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
                      <div className="absolute bottom-6 left-6 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                    </div>

                    {/* Card Shadow */}
                    <div className="absolute inset-0 bg-black/20 rounded-3xl transform translate-y-4 blur-xl group-hover:translate-y-8 transition-transform duration-500"></div>
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
