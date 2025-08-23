"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RenkKaybolma = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState("playing"); // 'playing', 'correct', 'wrong', 'gameOver'
  const [colors, setColors] = useState([]);
  const [colorCounts, setColorCounts] = useState({});
  const [mostFrequentColors, setMostFrequentColors] = useState([]); // Array olarak değiştirildi

  const [level, setLevel] = useState(1);
  const [remainingBalls, setRemainingBalls] = useState(49);

  const colorOptions = [
    "bg-white", // beyaz
    "bg-green-500", // yeşil
    "bg-yellow-500", // sarı
    "bg-red-500", // kırmızı
    "bg-black", // siyah
    "bg-[#9966CC]", // özel mor tonu
  ];

  // Yeni oyun başlat
  const startNewGame = () => {
    let newColors = [];
    let newColorCounts = {};
    let hasEqualCounts = true;

    // Eşit sayıda top olmayana kadar yeniden dağıt
    while (hasEqualCounts) {
      newColors = [];
      newColorCounts = {};

      // 49 top için rastgele renkler ata
      for (let i = 0; i < 49; i++) {
        const randomColor =
          colorOptions[Math.floor(Math.random() * colorOptions.length)];
        newColors.push(randomColor);

        if (newColorCounts[randomColor]) {
          newColorCounts[randomColor]++;
        } else {
          newColorCounts[randomColor] = 1;
        }
      }

      // Eşit sayıda top olan renkler var mı kontrol et
      const counts = Object.values(newColorCounts);
      const uniqueCounts = [...new Set(counts)];
      hasEqualCounts = uniqueCounts.length !== counts.length;
    }

    // En çok olan renkleri bul (eşit sayıda olanları da dahil et)
    let maxCount = 0;
    let maxColors = [];
    Object.keys(newColorCounts).forEach((color) => {
      if (newColorCounts[color] > maxCount) {
        maxCount = newColorCounts[color];
        maxColors = [color];
      } else if (newColorCounts[color] === maxCount) {
        maxColors.push(color);
      }
    });

    setColors(newColors);
    setColorCounts(newColorCounts);
    setMostFrequentColors(maxColors);
    setGameState("playing");
    setRemainingBalls(49);
  };

  // Renk seçimi yap
  const handleColorClick = (selectedColor) => {
    if (gameState !== "playing") return;

    if (!selectedColor) return; // boş hücre

    // Seçilen renk en çok olan renklerden biri mi kontrol et
    if (mostFrequentColors.includes(selectedColor)) {
      // Doğru tahmin - o renkteki topları kaldır (indexleri sabit tut)
      const newColors = colors.map((color) =>
        color === selectedColor ? null : color
      );
      const removedCount = colorCounts[selectedColor] || 0;

      // Yeni renk sayılarını hesapla (null hariç)
      const newColorCounts = {};
      newColors.forEach((color) => {
        if (!color) return;
        if (newColorCounts[color]) {
          newColorCounts[color]++;
        } else {
          newColorCounts[color] = 1;
        }
      });

      // Kalan top sayısını güncelle
      const newRemainingBalls = remainingBalls - removedCount;
      setRemainingBalls(newRemainingBalls);

      // Eğer tüm toplar bittiyse oyun biter
      if (newRemainingBalls <= 0) {
        setColors(newColors);
        setColorCounts({});
        setGameState("gameOver");
        return;
      }

      // Yeni en çok olan renkleri bul (eşit sayıda olanları da dahil et)
      let maxCount = 0;
      let maxColors = [];
      Object.keys(newColorCounts).forEach((color) => {
        if (newColorCounts[color] > maxCount) {
          maxCount = newColorCounts[color];
          maxColors = [color];
        } else if (newColorCounts[color] === maxCount) {
          maxColors.push(color);
        }
      });

      setColors(newColors);
      setColorCounts(newColorCounts);
      setMostFrequentColors(maxColors);

      // Doğru mesajı göster
      setGameState("correct");
      setTimeout(() => {
        setGameState("playing");
      }, 1000);
    } else {
      // Yanlış tahmin
      setGameState("wrong");
      setTimeout(() => {
        startNewGame();
      }, 1500);
    }
  };

  // Oyun başlangıcında
  useEffect(() => {
    startNewGame();
  }, []);

  // En çok olan renkleri göster
  const getMostFrequentText = () => {
    if (mostFrequentColors.length === 1) {
      return `En çok olan renk: ${getColorName(mostFrequentColors[0])}`;
    } else {
      const colorNames = mostFrequentColors.map((color) => getColorName(color));
      return `En çok olan renkler (${colorNames.join(
        ", "
      )}) - Herhangi birini seçebilirsiniz!`;
    }
  };

  // Renk adını Türkçe olarak getir
  const getColorName = (colorClass) => {
    const colorNames = {
      "bg-white": "Beyaz",
      "bg-green-500": "Yeşil",
      "bg-yellow-500": "Sarı",
      "bg-red-500": "Kırmızı",
      "bg-black": "Siyah",
      "bg-[#9966CC]": "Mor",
    };
    return colorNames[colorClass] || colorClass;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Renk Kaybolma Oyunu
          </h1>
          <p className="text-white/80 text-lg">
            En çok olan rengi bul ve tıkla! O toplar kaybolacak.
          </p>

          {/* Seviye ve Kalan Top */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-white text-sm">Kalan Top</p>
              <p className="text-2xl font-bold text-blue-400">
                {remainingBalls}
              </p>
            </div>
          </div>
        </div>

        {/* Oyun Durumu Mesajları */}
        {gameState === "correct" && (
          <div className="text-center mb-6">
            <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 inline-block">
              <p className="text-green-300 text-xl font-bold">✅ Doğru!</p>
            </div>
          </div>
        )}

        {gameState === "wrong" && (
          <div className="text-center mb-6">
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 inline-block">
              <p className="text-red-300 text-xl font-bold">
                ❌ Yanlış! Yeniden başlıyor...
              </p>
            </div>
          </div>
        )}

        {gameState === "gameOver" && (
          <div className="text-center mb-6">
            <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4 inline-block">
              <p className="text-yellow-300 text-xl font-bold">
                🏆 Tebrikler! Tüm topları temizlediniz!
              </p>
            </div>
          </div>
        )}

        {/* Oyun Tahtası */}
        <div className="grid grid-cols-7 gap-4 max-w-lg mx-auto">
          {colors.map((color, index) =>
            color ? (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                disabled={gameState !== "playing"}
                className={`
                w-16 h-16 rounded-full ${color} 
                transition-all duration-300 transform hover:scale-110 
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl
              `}
              />
            ) : (
              <div key={index} className="w-16 h-16 rounded-full opacity-0" />
            )
          )}
        </div>

        {/* Yeniden Başla Butonu - Her zaman görünür */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              startNewGame();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg 
                     transition-all duration-300 font-semibold text-base
                     hover:scale-105 shadow-lg"
          >
            Yeniden Başla
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenkKaybolma;
