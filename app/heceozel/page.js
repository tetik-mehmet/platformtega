"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeceOzel({ visibleSetKeys = null }) {
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isExerciseStarted, setIsExerciseStarted] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // Zorluk seviyelerine göre süreler (tüm etkinliklerde aynı)
  const difficultyTimes = {
    easy: 90, // Kolay: 90 saniye
    medium: 60, // Orta: 60 saniye
    hard: 30, // Zor: 30 saniye
  };

  const exerciseSets = {
    exercise1: {
      title: "Etkinlik 1",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["RA", "KA", "MA"], answer: "MAKARA" },
        { id: 2, syllables: ["YON", "Sİ", "TAN"], answer: "TANSİYON" },
        { id: 3, syllables: ["Kİ", "ÇI", "TAP"], answer: "KİTAPÇI" },
        { id: 4, syllables: ["REV", "GÖ", "Lİ"], answer: "GÖREVLİ" },
        { id: 5, syllables: ["LE", "MEK", "İZ"], answer: "İZLEMEK" },
        { id: 6, syllables: ["MAK", "ĞIR", "ÇA"], answer: "ÇAĞIRMAK" },
        { id: 7, syllables: ["Cİ", "KAH", "VE"], answer: "KAHVECİ" },
        { id: 8, syllables: ["GE", "PÜR", "SÜ"], answer: "SÜPÜRGE" },
        { id: 9, syllables: ["ÇI", "YIK", "KA"], answer: "KAYIKÇI" },
        { id: 10, syllables: ["O", "CU", "YUN"], answer: "OYUNCU" },
        { id: 11, syllables: ["LIK", "ME", "ZAR"], answer: "MEZARLIK" },
        { id: 12, syllables: ["ÇA", "KAN", "LIŞ"], answer: "ÇALIŞKAN" },
        { id: 13, syllables: ["DİK", "Lİ", "KAT"], answer: "DİKKATLİ" },
      ],
    },
    exercise2: {
      title: "Etkinlik 2",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LIK", "Kİ", "RA"], answer: "KİRALIK" },
        { id: 2, syllables: ["PI", "ÇAR", "CI"], answer: "ÇARPICI" },
        { id: 3, syllables: ["ÇIR", "CI", "PI"], answer: "ÇIRPICI" },
        { id: 4, syllables: ["Sİ", "BE", "Lİ"], answer: "BESİLİ" },
        { id: 5, syllables: ["U", "LI", "ZAY"], answer: "UZAYLI" },
        { id: 6, syllables: ["DER", "MEK", "Gİ"], answer: "GİDERMEK" },
        { id: 7, syllables: ["İH", "YAÇ", "Tİ"], answer: "İHTİYAÇ" },
        { id: 8, syllables: ["CA", "KIN", "SA"], answer: "SAKINCA" },
        { id: 9, syllables: ["KUV", "Lİ", "VET"], answer: "KUVVETLİ" },
        { id: 10, syllables: ["LUK", "ÇO", "CUK"], answer: "ÇOCUKLUK" },
        { id: 11, syllables: ["Lİ", "MET", "ZAH"], answer: "ZAHMETLİ" },
        { id: 12, syllables: ["PIŞ", "YA", "KAN"], answer: "YAPIŞKAN" },
        { id: 13, syllables: ["GE", "Lİ", "DİK"], answer: "GEDİKLİ" },
      ],
    },
    exercise3: {
      title: "Etkinlik 3",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["CIM", "KI", "VIL"], answer: "KIVILCIM" },
        { id: 2, syllables: ["YON", "Sİ", "PAN"], answer: "PANSİYON" },
        { id: 3, syllables: ["DI", "RIM", "KAL"], answer: "KALDIRIM" },
        { id: 4, syllables: ["T", "PET", "ROM"], answer: "TROMPET" },
        { id: 5, syllables: ["LA", "MU", "MUŞ"], answer: "MUŞMULA" },
        { id: 6, syllables: ["NOL", "MA", "YA"], answer: "MANOLYA" },
        { id: 7, syllables: ["KAS", "YA", "A"], answer: "AKASYA" },
        { id: 8, syllables: ["BUN", "BAR", "YA"], answer: "BARBUNYA" },
        { id: 9, syllables: ["YE", "SUL", "FA"], answer: "FASULYE" },
        { id: 10, syllables: ["TİŞ", "AK", "ROS"], answer: "AKROSTİŞ" },
        { id: 11, syllables: ["LE", "FON", "TE"], answer: "TELEFON" },
        { id: 12, syllables: ["JUR", "BA", "A"], answer: "ABAJUR" },
        { id: 13, syllables: ["GU", "AR", "JA"], answer: "JAGUAR" },
      ],
    },
    exercise4: {
      title: "Etkinlik 4",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LA", "PA", "MUT"], answer: "PATLAMA" },
        { id: 2, syllables: ["CA", "KA", "RIN"], answer: "KARINCA" },
        { id: 3, syllables: ["BEK", "TE", "KÖS"], answer: "KÖSTEBEK" },
        { id: 4, syllables: ["NAL", "PE", "TI"], answer: "PENALTI" },
        { id: 5, syllables: ["LA", "MU", "MUŞ"], answer: "MUŞMULA" },
        { id: 6, syllables: ["KİR", "ÇE", "GE"], answer: "ÇEKİRGE" },
        { id: 7, syllables: ["RA", "RET", "HA"], answer: "HARARET" },
        { id: 8, syllables: ["LAN", "BU", "TI"], answer: "BULANTI" },
        { id: 9, syllables: ["B", "ŞİT", "RON"], answer: "BRONŞİT" },
        { id: 10, syllables: ["ZİT", "NÜ", "Sİ"], answer: "SİNÜZİT" },
        { id: 11, syllables: ["VİL", "Sİ", "CE"], answer: "SİVİLCE" },
        { id: 12, syllables: ["TİT", "MEK", "RE"], answer: "TİTREMEK" },
        { id: 13, syllables: ["YIF", "LIK", "ZA"], answer: "ZAYIFLIK" },
      ],
    },
    exercise5: {
      title: "Etkinlik 5",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LA", "LIK", "TA", "SA"], answer: "SALATALIK" },
        { id: 2, syllables: ["TEP", "GA", "AN", "Zİ"], answer: "GAZİANTEP" },
        { id: 3, syllables: ["MA", "RİS", "TAN", "CA"], answer: "MACARİSTAN" },
        { id: 4, syllables: ["LİK", "Rİ", "O", "MU"], answer: "OMURİLİK" },
        { id: 5, syllables: ["TO", "MO", "TİV", "O"], answer: "OTOMOTİV" },
        { id: 6, syllables: ["KIR", "Sİ", "TA", "YE"], answer: "KIRTASİYE" },
        { id: 7, syllables: ["LE", "TE", "VİZ", "YON"], answer: "TELEVİZYON" },
        { id: 8, syllables: ["Lİ", "MAN", "DA", "NA"], answer: "MANDALİNA" },
        { id: 9, syllables: ["KUR", "RI", "TA", "CI"], answer: "KURTARICI" },
        { id: 10, syllables: ["Lİ", "TE", "YE", "NEK"], answer: "YETENEKLİ" },
        { id: 11, syllables: ["KUL", "CI", "LA", "NI"], answer: "KULLANICI" },
        { id: 12, syllables: ["E", "Tİ", "YA", "YOP"], answer: "ETİYOPYA" },
        { id: 13, syllables: ["GAS", "MA", "DA", "KAR"], answer: "MADAGASKAR" },
        { id: 14, syllables: ["Bİ", "KO", "LOM", "YA"], answer: "KOLOMBİYA" },
        { id: 15, syllables: ["Lİ", "VE", "RİŞ", "EL"], answer: "ELVERİŞLİ" },
      ],
    },
    exercise6: {
      title: "Etkinlik 6",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["Lİ", "LİK", "RİM", "VE"], answer: "VERİMLİLİK" },
        { id: 2, syllables: ["YI", "LA", "TOP", "CI"], answer: "TOPLAYICI" },
        { id: 3, syllables: ["KE", "SİR", "BA", "LI"], answer: "BALIKESİR" },
        { id: 4, syllables: ["LE", "ŞE", "KER", "ME"], answer: "ŞEKERLEME" },
        { id: 5, syllables: ["KO", "Lİ", "CA", "E"], answer: "KOCAELİ" },
        { id: 6, syllables: ["KAS", "MO", "TA", "NU"], answer: "KASTAMONU" },
        { id: 7, syllables: ["BA", "LUM", "KAP", "ĞA"], answer: "KAPLUMBAĞA" },
        { id: 8, syllables: ["KA", "BA", "LIK", "LA"], answer: "KALABALIK" },
        { id: 9, syllables: ["TİF", "LO", "MO", "KO"], answer: "LOKOMOTİF" },
        { id: 10, syllables: ["MA", "MA", "TE", "TİK"], answer: "MATEMATİK" },
        { id: 11, syllables: ["VUR", "LA", "MAK", "GU"], answer: "VURGULAMAK" },
        {
          id: 12,
          syllables: ["A", "NAH", "LIK", "TAR"],
          answer: "ANAHTARLIK",
        },
        {
          id: 13,
          syllables: ["HEN", "DİS", "LİK", "MÜ"],
          answer: "MÜHENDİSLİK",
        },
        { id: 14, syllables: ["Tİ", "Mİ", "SU", "RA"], answer: "TİRAMİSU" },
        { id: 15, syllables: ["UR", "LI", "FA", "ŞAN"], answer: "ŞANLIURFA" },
      ],
    },
    exercise7: {
      title: "Etkinlik 7",
      description: "Hızlı Okuma - Hece Birleştirme",
      exercises: [
        { id: 1, syllables: ["LOG", "Sİ", "KO", "P"], answer: "PSİKOLOJİ" },
        { id: 2, syllables: ["TE", "Jİ", "ST", "RA"], answer: "STRATEJİ" },
        { id: 3, syllables: ["TÜP", "NE", "HA", "KÜ"], answer: "KÜTÜPHANE" },
        { id: 4, syllables: ["DE", "MOK", "Sİ", "RA"], answer: "DEMOKRASİ" },
        { id: 5, syllables: ["TO", "Mİ", "Jİ", "LO"], answer: "MİTOLOJİ" },
        { id: 6, syllables: ["LO", "Bİ", "YO", "Jİ"], answer: "BİYOLOJİ" },
        { id: 7, syllables: ["KO", "Mİ", "NO", "E"], answer: "EKONOMİ" },
        { id: 8, syllables: ["ME", "ZE", "MAL", "Cİ"], answer: "MALZEMECİ" },
        { id: 9, syllables: ["YA", "EN", "DO", "NEZ"], answer: "ENDONEZYA" },
        { id: 10, syllables: ["KA", "RIK", "LE", "KI"], answer: "KIRIKKALE" },
        { id: 11, syllables: ["A", "KA", "VO", "DO"], answer: "AVOKADO" },
        { id: 12, syllables: ["BİS", "A", "TAN", "RA"], answer: "ARABİSTAN" },
        { id: 13, syllables: ["ZA", "BEY", "PA", "RI"], answer: "BEYPAZARI" },
        { id: 14, syllables: ["Cİ", "Nİ", "LİK", "Bİ"], answer: "BİNİCİLİK" },
        { id: 15, syllables: ["YA", "VUS", "A", "TUR"], answer: "AVUSRURYA" },
      ],
    },
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const startExercise = (exerciseKey, difficulty) => {
    setSelectedExercise(exerciseKey);
    setSelectedDifficulty(difficulty);
    setTimeLeft(difficultyTimes[difficulty]);
    setIsExerciseStarted(true);
    setIsTimerRunning(true);
  };

  const checkAnswers = () => {
    setShowResults(true);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setShowResults(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const resetExercise = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(selectedDifficulty ? difficultyTimes[selectedDifficulty] : 60);
    setIsTimerRunning(false);
    setIsExerciseStarted(false);
    setSelectedExercise(null);
    setSelectedDifficulty(null);
  };

  const goBackToSelection = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(selectedDifficulty ? difficultyTimes[selectedDifficulty] : 60);
    setIsTimerRunning(false);
    setIsExerciseStarted(false);
    setSelectedExercise(null);
    setSelectedDifficulty(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentExercises = selectedExercise
    ? exerciseSets[selectedExercise].exercises
    : [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500 hover:bg-green-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "hard":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "Kolay";
      case "medium":
        return "Orta";
      case "hard":
        return "Zor";
      default:
        return "";
    }
  };

  const goBackToOzel = () => {
    router.push("/ozel");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {/* Geri Dön Butonu - Sol Üst */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={goBackToOzel}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Geri Dön
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Hızlı Okuma - Hece Birleştirme
          </h1>
          <p className="text-lg text-gray-600">
            Her satırdaki heceleri birleştirerek anlamlı kelimeler oluşturun
          </p>
        </div>

        {!isExerciseStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
            {/* Etkinlik 1 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise1")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 1
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                {/* Zorluk Seviyeleri */}
                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise1", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise1", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise1", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 2 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise2")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-green-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 2
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise2", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise2", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise2", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 3 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise3")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">3</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 3
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise3", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise3", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise3", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 4 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise4")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-orange-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600">4</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 4
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">13 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise4", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise4", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise4", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 5 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise5")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-red-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-red-600">5</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 5
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise5", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise5", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise5", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 6 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise6")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-pink-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-600">6</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 6
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise6", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise6", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise6", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}

            {/* Etkinlik 7 Kartı */}
            {(!visibleSetKeys || visibleSetKeys.includes("exercise7")) && (
              <div className="bg-white rounded-lg shadow-lg p-3 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600">7</span>
                </div>
                <h2 className="text-sm font-semibold text-gray-800 mb-2">
                  Etkinlik 7
                </h2>
                <p className="text-xs text-gray-600 mb-2">Hece Birleştirme</p>
                <p className="text-xs text-gray-500 mb-3">15 satır</p>

                <div className="space-y-2">
                  <button
                    onClick={() => startExercise("exercise7", "easy")}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Kolay (90s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise7", "medium")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Orta (60s)
                  </button>
                  <button
                    onClick={() => startExercise("exercise7", "hard")}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg transition duration-200 shadow-lg w-full text-xs"
                  >
                    Zor (30s)
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Geri Dön Butonu */}
            <div className="mb-6">
              <button
                onClick={goBackToSelection}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Etkinlik Seçimine Geri Dön
              </button>
            </div>

            {/* Ana süre göstergesi */}
            {isTimerRunning && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {exerciseSets[selectedExercise]?.title} -{" "}
                  {getDifficultyText(selectedDifficulty)} Seviye
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-600">
                  {timeLeft > 0 ? "Süre devam ediyor..." : "Süre doldu!"}
                </p>
              </div>
            )}

            {!showResults ? (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-center font-semibold text-gray-700 bg-gray-100 p-3 rounded">
                  <div>No</div>
                  <div>Heceler</div>
                  <div>Cevabınız</div>
                  <div>Doğru Cevap</div>
                </div>

                {currentExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-200 py-3"
                  >
                    <div className="text-center font-medium text-gray-600">
                      {exercise.id}
                    </div>
                    <div className="flex gap-2 justify-center">
                      {exercise.syllables.map((syllable, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium"
                        >
                          {syllable}
                        </span>
                      ))}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={answers[exercise.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(exercise.id, e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Kelimeyi yazın..."
                      />
                    </div>
                    <div className="text-center text-gray-400">---</div>
                  </div>
                ))}

                <div className="text-center mt-6">
                  <button
                    onClick={checkAnswers}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg"
                  >
                    Cevapları Kontrol Et
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-center font-semibold text-gray-700 bg-gray-100 p-3 rounded">
                  <div>No</div>
                  <div>Heceler</div>
                  <div>Cevabınız</div>
                  <div>Doğru Cevap</div>
                </div>

                {currentExercises.map((exercise) => {
                  const userAnswer = answers[exercise.id] || "";
                  const isCorrect =
                    userAnswer.toLowerCase() === exercise.answer.toLowerCase();

                  return (
                    <div
                      key={exercise.id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b border-gray-200 py-3"
                    >
                      <div className="text-center font-medium text-gray-600">
                        {exercise.id}
                      </div>
                      <div className="flex gap-2 justify-center">
                        {exercise.syllables.map((syllable, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md font-medium"
                          >
                            {syllable}
                          </span>
                        ))}
                      </div>
                      <div
                        className={`text-center ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {userAnswer || "Boş"}
                      </div>
                      <div
                        className={`text-center font-medium ${
                          isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {exercise.answer}
                      </div>
                    </div>
                  );
                })}

                <div className="text-center mt-6">
                  <button
                    onClick={resetExercise}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg mr-4"
                  >
                    Yeniden Başla
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
