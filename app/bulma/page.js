"use client";
import React, { useState, useEffect, useRef } from "react";
import { Timer, Play, RotateCcw, CheckCircle, Eye, Target } from "lucide-react";
import { useRouter } from "next/navigation";

const MEVSIM_METNI = `Türkiye'de bir yılda dört mevsim vardır. Bu mevsimler ilkbahar, yaz, sonbahar, kıştır. Her mevsim üç ay sürer. Aralık, ocak, şubat ayları kış mevsimi, mart, nisan, mayıs ayları ilkbahar mevsimi, haziran, temmuz, ağustos ayları yaz mevsimi, eylül, ekim, kasım ayları da sonbahar mevsimidir. İlkbahar mevsiminde güneş hem daha erken doğar, hem de daha geç batar. Bunun için ilkbahar mevsiminde günler uzun olur. Ağaçlar çiçek açar. Her yer yemyeşil olur, bazı hayvanlar kış uykusundan uyanır göçmen kuşlar uzak ülkelerden gelir. İlkbahar mevsiminde sık sık yağmur yağar, gök gürler, şimşek çakar. Ama, sonra hemen güneş açar. İlkbahar mevsimi ne soğuk ne de sıcaktır. İlkbaharda genellikle havalar ılık olur. İnsanlar evlerinde ilkbahar temizliği yaparlar. Yaz mevsimine havalar iyice ısınır. Bütün okullar tatil olur. Denizlerin, göllerin, nehirlerin suyu ısınır. Herkes denizlere, dağlara veya ormanlara koşar. Deniz ve güneş sağlığımız için çok yararlıdır. Yaz mevsiminde meyveler, sebzeler olgunlaşır. Bütün bitkiler biraz daha büyürler. Sonbaharda artık uzun günler yavaş yavaş kısalır. Havalar da artık çok şıcak değildir. Sonbahar mevsiminde çok yamur yağar. Üşümemek için daha kalın elbiseler giyeriz. Tatil biter okullar ve dersler başlar. Kışın havalar iyice soğur. Kış mevsiminde, gündüzler kısa geceler uzundur. Kışın ağaçların hiç yaprağı kalmaz. Sadece çam gibi bazı ağaçlar kışın da yeşil kalır. Kış mevsiminde hasta olmamak ve üşümemek için en kalın elbiselerimizi giyeriz.`;

const KEDI_METNI = `Kediler yalnız yaşamayı seven, özgürce davranan, bağımsız yaradılışlı hayvanlardır. Diğer evcil hayvanlar gibi kediler sahiplerinin isteklerine her zaman boyun eğmezler. Kediler aç kaldıkları zaman miyavlar. Daha bunlar gibi pek çok hareketle kediler, insanlara istedikleri mesajı verirler. Kedilerin minik patileri, tehlike anında âdeta yırtıcı bir aslan pençesine dönüşür. Kediler tırnaklarını patilerinin içinde saklarlar. Tehlike anında bu tırnaklar devreye girer ve keskin, aynı zamanda sivri birer silah oluverirler. "Dört ayağı üzerine düşmek" deyimi kediler için söylenebilecek doğru bir sözdür. Metrelerce yükseklikten düşseler bile her zaman dört ayakları üzerine düşerler. Bunun gerçek sebebi, kedilerin düşerken dengelerini sağlamak için kuyruklarını kullanmaları ve gövdelerinin ağırlık merkezini değiştirip, patileri üzerine düşebilmeleridir. Ağaçların üzerinde, yüksek yerlerde dolaşmayı seven kediler, düşme tehlikesi anında bu koruyucu özelliklerini kullanırlar. Kedilerin gözleri geceleri parıl parıl parlar. Karanlıkta büyüyerek yuvarlaklaşan, bu sayede ışığı daha fazla toplayan gözbebeklerine sahiptirler. Bu özellikleri aynı zamanda geceleri çok iyi görmelerini de sağlar. Bir nesneyi görebilmeleri için azıcık ışık yeterlidir. Kediler evdeki zararlı böceklerin, yılanların ve farelerin en büyük düşmanıdır. Kediler tavuk, horoz gibi kümes hayvanlarına ilişmezler.`;

const COCUK_METNI = `Eğitim, insanı daha iyiye daha güzele, daha doğruya götürmek için yapılır. Çocuk eğitimi ise çok önemli ve bilgi gerektiren bir iştir. Çocuk eğitimde dikkat edilecek ilk şey, çocuğu kendi duygu ve düşüncelerimiz açısından değil, onun psikolojik yapısı bakımından değerlendirmektir. Çocuğun çoğu kez bize yabancı gelen duygu ve düşüncelerini anlamaya çalışmalıyız. Maalesef, eğitimin çok geliştiği günümüzde bile birçok anne ve baba çocuk eğitiminde hata yapmaktadır. Kendilerine yabancı gelen çocuk duygu ve düşüncesini, anlamaya çalışmayıp, onları kendi istekleri doğrultusunda eğitmek isterler. Çocuk kendine ait orijinal dünyası olan bir varlıktır. Çevresinde gördüğü şeyleri, o dünyanın ölçüleriyle değerlendirir. Bu nedenle çocukların öğrenmek amacıyla büyüklere sorduğu, sonu gelmeyen sorulara büyük bir sabırla cevap vermeliyiz. Yani, çocuk eğiticilerinin sahip olmaları gereken en önemli iki şey, sabır ve anlayıştır. Bu iki şeye, çocuğun doğduğu günden başlayarak eğitiminde en önemli rolü oynayan, anne ve babaların özellikle dikkat etmeleri gerekir.`;

const TURKIYE_METNI = `Türkiye Cumhuriyeti, 1923 yılında Mustafa Kemal Atatürk tarafından kurulmuştur. Türkiye, hem Avrupa hem de Asya kıtasında toprakları bulunan bir ülkedir. Türkiye'nin Avrupa kıtasında bulunan bölümüne Trakya; Asya kıtasında bulunan bölümüne ise Anadolu denir. Asya kıtası ile Avrupa kıtası İstanbul Boğazı, Marmara Denizi ve Çanakkale Boğazı ile ayrılır. Dünyada iki kıtada toprakları bulunan ülkeler sadece Türkiye, Rusya Federasyonu ve Mısır'dır. Türkiye, üç tarafı denizlerle çevrili bir ülkedir. Türkiye'nin güneyde Akdeniz, kuzeyde Karadeniz, batıda Ege Denizi ve bir iç deniz olan Marmara Denizi ile kıyısı vardır. En uzun deniz kıyısı Karadeniz iledir. Türkiye; kuzeybatıda Yunanistan ve Bulgaristan; güneydoğuda Suriye ve Irak; doğuda İran, Azerbaycan, Ermenistan ve Gürcistan ile komşudur. En uzun kara sınırı Suriye iledir. Türkiye 814.578 kilometre karelik yüz ölçümü ile Rusya Federasyonu'ndan sonra Avrupa'nın en büyük yüzölçümüne sahip ülkesidir. Türkiye'nin nüfusu ise 2003 yılı Ocak ayı verilerine göre 70 milyondan fazladır. Türkiye nüfus olarak Avrupa'da Almanya'dan sonra ikinci sıradadır. Dünya'da ise on beşinci büyük nüfusa sahip ülkedir. Türkiye'de 81 vilâyet vardır. En kalabalık şehir 15 milyondan fazla insanın yaşadığı İstanbul'dur. İstanbul'un yarısı Asya'da, yarısı Avrupa'dadır. Böyle iki kıtada toprakları olan şehir dünyada sadece İstanbul'dur. İstanbul'dan sonra en büyük şehirler Ankara, İzmir, Adana, Bursa ve Konya'dır. Türkiye'de yedi coğrafî bölge vardır. Bunlar; Marmara Bölgesi, Ege Bölgesi, Akdeniz Bölgesi, Karadeniz Bölgesi, İç Anadolu Bölgesi, Doğu Anadolu Bölgesi ve Güneydoğu Anadolu Bölgesi'dir. Nüfusun en yoğun olduğu bölge İstanbul'un da bulunduğu Marmara Bölgesi'dir. Ayrıca Marmara Bölgesi sanayileşmenin en yoğun olduğu bölgedir. Yüzölçümü en geniş olan bölge ise Doğu Anadolu Bölgesi'dir. Ayrıca Doğu Anadolu Bölgesi dağların en yoğun olduğu bölgedir. Tarıma en elverişli bölgeler Ege ve Akdeniz Bölgeleri'dir. Turistik yerlerin en yoğun olduğu bölgeler ise Akdeniz, Ege ve Marmara Bölgeleri'dir.`;

const KAHVE_METNI = `Güne başlarken çoğumuzun ilk işi, sıcak bir kahve hazırlamak olur. O eşsiz kahve kokusu, uykulu gözleri bile bir anda canlandırır. Bir fincan kahve, sadece bir içecekten çok daha fazlasıdır. Kimileri için bir alışkanlık, kimileri içinse güne tutunmanın en güzel yoludur. O ilk yudumla birlikte zihnimiz berraklaşır, bedenimiz canlanır, ruhumuz huzur bulur. Bazıları için sadece bir içecek olan kahve, birçokları için bir ritüeldir. Sabahları içilen sade bir kahve, günün nasıl geçeceğine dair ipuçları verir adeta. Kimileri sütlü kahve tercih ederken, kimileri yoğun aromalı Türk kahvesinden vazgeçemez. Kahvenin türü ne olursa olsun, o tanıdık sıcaklık hep aynıdır. Espresso, latte, cappuccino, filtre kahve ya da menengiç kahvesi... Her biri ayrı bir karakter, ayrı bir hikâye taşır. Kahve, sosyal hayatın da vazgeçilmez bir parçasıdır. Arkadaş buluşmalarında ya da yalnız geçirilen anlarda, bir fincan kahve her zaman en iyi eşlikçidir. "Bir kahve içelim mi?" cümlesi çoğu zaman bir dostluğun başlangıcı, bir muhabbetin habercisidir. Kahve eşliğinde edilen sohbetler, paylaşılan duygular, içilen kahveden çok daha fazlasını ifade eder. Kahve, aynı zamanda bir bağ kurma biçimidir. Ailelerin, dostların, âşıkların buluşma noktasıdır. Kitap okurken, çalışırken ya da sadece dinlenirken bir yudum kahve, anı daha anlamlı kılar. Soğuk bir kış gününde elleri ısıtan sıcacık bir fincan, ya da yazın buzlu bir kahveyle ferahlamak... Her mevsime, her duyguya eşlik edebilen nadir içeceklerden biridir kahve. Sadece zihni değil, kalbi de ısıtan bir tarafı vardır.`;

const SEVGI_METNI = `Sevgi nedir? Bu kelimenin gerçek anlamını biliyor muyuz, ya da düşündük mü? Sevgi üzerine herkes kendince bir fikir yürütür. Aslında sevgi, duyguların en iyisi ve en güzelidir. Güzel olduğu kadar da özveri gerektirir. Canlıların en gelişmişi, en akıllısı bile bu özveriye muhtaçtır. Yaşamak işin sağlığa, mutluluğa, paraya ne kadar ihtiyacın varsa karşılıklı sevgiye de o kadar ihtiyacımız vardır. Çünkü insanı sevgi kadar yücelten ve sevgi kadar mutlu eden unsur daha yoktur. Sevgisiz büyüyen bir çocuğun ruhsal ve bedensel gelişmesi normal olmayacağı gibi sosyal ilişiklileri de yeterli düzeyde olmaz. Sevgiden yoksun büyüyen bir kişinin nerede, ne zaman ne yapacağını kimse bilemez. Böyle bir insan ileriki yıllarında acımasız bir kişiliğe sahip olabilir. Bunun gibi sevgiden yoksun büyüyen bireylerden oluşan bir toplumda huzur, barış gelişmez ve hoşgörü beklenmez. Sevgi ve sevmek deyince akla sadece insanlara duyulan sevgi gelmemelidir. Bizler, çevremizdeki her şeye sevgi duyabiliriz. Örneğin kuşları, çiçekleri, ağaçları hatta eşyaları bile severiz. Kimisini bize bir şeyler ifade ettiği, kimisini de içimizden geldiği için severiz. Çevremizde bulunanlara ilgi göstermemiz, sevmemiz, aynı zamanda bizim insanlığımızı yansıtmaktadır. Çevremizdeki hayvanları sevmek, bizde onları koruma hissi uyandırır. Genellikle korumamız altındaki hayvanları, hayvan olarak değil, bir dost, bir arkadaş olarak görürüz. İnsanlara duyduğumuz sevgi ise, sevgilerin en yücesi ve en güzelidir. Sevgi insanları iyi, şefkatli birer birey haline getirir. İnsanın sevgiye ihtiyacı vardır. Çünkü sevgi insanı insan kılan en önemli gereksinimdir. Sevgi bir ihtiyaçtır. Çünkü onsuz yaşamak güçtür. Yine insan sevgiye muhtaçtır, çünkü yaşama arzusunu içinde sürekli tutabilmesi buna bağlıdır.`;

const ALISTIRMALAR = [
  {
    id: "mevsim",
    baslik: "Mevsim Kelimesi",
    metin: MEVSIM_METNI,
    arananKelime: "mevsim",
    renk: "from-yellow-400 to-orange-500",
  },
  {
    id: "kedi",
    baslik: "Kedi Kelimesi",
    metin: KEDI_METNI,
    arananKelime: "kedi",
    renk: "from-pink-400 to-purple-500",
  },
  {
    id: "cocuk",
    baslik: "Çocuk Kelimesi",
    metin: COCUK_METNI,
    arananKelime: "çocuk",
    renk: "from-green-400 to-blue-500",
  },
  {
    id: "turkiye",
    baslik: "Türkiye Kelimesi",
    metin: TURKIYE_METNI,
    arananKelime: "Türkiye",
    renk: "from-red-400 to-indigo-500",
  },
  {
    id: "kahve",
    baslik: "Kahve Kelimesi",
    metin: KAHVE_METNI,
    arananKelime: "kahve",
    renk: "from-amber-600 to-brown-700",
  },
  {
    id: "sevgi",
    baslik: "Sevgi Kelimesi",
    metin: SEVGI_METNI,
    arananKelime: "sevgi",
    renk: "from-rose-400 to-pink-600",
  },
];

const ARANAN_KELIME = "mevsim";
const SURE_LIMITI = 30;

export default function BulmaPage({ visibleIds = null, defaultId = "mevsim" }) {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState(
    defaultId || "mevsim"
  );
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SURE_LIMITI);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [highlightedText, setHighlightedText] = useState("");

  const intervalRef = useRef(null);
  const textRef = useRef(null);

  // Eğer görünür liste sınırlandıysa, seçimin geçerli kalmasını sağla
  useEffect(() => {
    if (visibleIds && !visibleIds.includes(selectedExercise)) {
      setSelectedExercise(visibleIds[0] || defaultId || "mevsim");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleIds]);

  // Seçili alıştırmayı al
  const currentExercise = ALISTIRMALAR.find((ex) => ex.id === selectedExercise);

  // Timer efekti
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning, timeLeft]);

  // Alıştırmayı başlat
  const startExercise = () => {
    setIsStarted(true);
    setIsTimerRunning(true);
    setTimeLeft(SURE_LIMITI);
    setShowResults(false);
    setUserAnswer("");
    setIsCorrect(null);
    setHighlightedText("");
  };

  // Alıştırmayı sıfırla
  const resetExercise = () => {
    setIsStarted(false);
    setIsTimerRunning(false);
    setTimeLeft(SURE_LIMITI);
    setShowResults(false);
    setUserAnswer("");
    setIsCorrect(null);
    setHighlightedText("");
  };

  // Cevabı kontrol et
  const checkAnswer = () => {
    const correctCount = (
      currentExercise.metin
        .toLowerCase()
        .match(new RegExp(currentExercise.arananKelime.toLowerCase(), "g")) ||
      []
    ).length;
    const userCount = parseInt(userAnswer) || 0;

    setIsCorrect(userCount === correctCount);

    // Metni vurgula
    const highlighted = currentExercise.metin.replace(
      new RegExp(currentExercise.arananKelime, "gi"),
      (match) => `<mark class="bg-yellow-300 px-1 rounded">${match}</mark>`
    );
    setHighlightedText(highlighted);

    setShowResults(true);
    setIsTimerRunning(false);
  };

  // Süreyi formatla
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Doğru kelime sayısını hesapla
  const getCorrectCount = () => {
    return (
      currentExercise.metin
        .toLowerCase()
        .match(new RegExp(currentExercise.arananKelime.toLowerCase(), "g")) ||
      []
    ).length;
  };

  const goBackToOzel = () => {
    router.push("/ozel");
  };

  if (!isStarted) {
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Kelime Bulma Alıştırması
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Metinde belirtilen kelimeyi bulun ve kaç kez geçtiğini sayın.
              Süreniz 30 saniye!
            </p>
          </div>

          {/* Alıştırma Seçimi */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
              Alıştırma Seçin:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {(visibleIds
                ? ALISTIRMALAR.filter((ex) => visibleIds.includes(ex.id))
                : ALISTIRMALAR
              ).map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    selectedExercise === exercise.id
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center gap-2 bg-gradient-to-r ${exercise.renk} text-white px-4 py-2 rounded-full mb-3`}
                    >
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">{exercise.baslik}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "{exercise.arananKelime}" kelimesini bulun
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full mb-4">
                <Target className="w-6 h-6" />
                <span className="font-semibold text-lg">
                  Aranan Kelime: "{currentExercise.arananKelime}"
                </span>
              </div>
              <div className="inline-flex items-center gap-3 bg-orange-100 text-orange-800 px-6 py-3 rounded-full">
                <Timer className="w-6 h-6" />
                <span className="font-semibold text-lg">
                  Süre: {SURE_LIMITI} saniye
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Talimatlar:
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  • Metni okumadan sadece "{currentExercise.arananKelime}"
                  kelimesine odaklanın
                </li>
                <li>• Kelimenin kaç kez geçtiğini sayın</li>
                <li>• 30 saniye süreniz var</li>
                <li>• Süre bitiminde cevabınızı girin</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={startExercise}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Play className="w-6 h-6" />
                Alıştırmayı Başlat
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kelime Bulma Alıştırması
          </h1>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
            <Target className="w-5 h-5" />
            <span className="font-semibold">
              "{currentExercise.arananKelime}" kelimesini bulun
            </span>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-semibold">Kalan Süre:</span>
            </div>
            <div
              className={`text-3xl font-bold px-4 py-2 rounded-lg ${
                timeLeft > 10
                  ? "text-green-600 bg-green-100"
                  : timeLeft > 5
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Metin */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Metin:</h3>
            <div className="text-sm text-gray-500 mb-3">
              Sadece{" "}
              <span
                className={`bg-gradient-to-r ${currentExercise.renk} text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg animate-pulse`}
              >
                "{currentExercise.arananKelime}"
              </span>{" "}
              kelimesine odaklanın ve kaç kez geçtiğini sayın
            </div>
          </div>

          <div
            ref={textRef}
            className="bg-gray-50 rounded-lg p-6 text-gray-800 leading-relaxed text-lg border-2 border-gray-200"
            style={{ minHeight: "400px" }}
          >
            {currentExercise.metin}
          </div>
        </div>

        {/* Cevap Girişi */}
        {!showResults && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                "{currentExercise.arananKelime}" kelimesi kaç kez geçiyor?
              </label>
              <div className="flex items-center justify-center gap-4">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-24 text-center text-2xl font-bold px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="0"
                  min="0"
                />
                <button
                  onClick={checkAnswer}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                >
                  Cevabı Kontrol Et
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sonuçlar */}
        {showResults && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Alıştırma Tamamlandı!
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-800">
                    {getCorrectCount()}
                  </div>
                  <div className="text-blue-600">Doğru Sayı</div>
                </div>
                <div className="bg-orange-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-800">
                    {userAnswer || 0}
                  </div>
                  <div className="text-orange-600">Sizin Cevabınız</div>
                </div>
                <div
                  className={`rounded-lg p-4 ${
                    isCorrect ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isCorrect ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {isCorrect ? "Doğru!" : "Yanlış!"}
                  </div>
                  <div
                    className={isCorrect ? "text-green-600" : "text-red-600"}
                  >
                    {isCorrect ? "Tebrikler!" : "Tekrar deneyin"}
                  </div>
                </div>
              </div>

              {isCorrect && (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    Mükemmel! Doğru cevap verdiniz!
                  </span>
                </div>
              )}

              {!isCorrect && (
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
                  <span className="font-semibold">
                    Doğru cevap: {getCorrectCount()}
                  </span>
                </div>
              )}
            </div>

            {/* Vurgulanmış Metin */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                <Eye className="w-5 h-5 inline mr-2" />"
                {currentExercise.arananKelime}" kelimesinin geçtiği yerler:
              </h4>
              <div
                className="bg-gray-50 rounded-lg p-6 text-gray-800 leading-relaxed text-lg border-2 border-gray-200"
                dangerouslySetInnerHTML={{
                  __html: highlightedText || currentExercise.metin,
                }}
              />
            </div>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExercise}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Yeni Alıştırma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
