// Hangi sayfaların hangi paketlere ait olduğunu tanımla
export const PAGE_PACKAGES = {
  "/genel": ["hizliOkuma"],
  "/dilbilgisi": ["temelIngilizce"],
  "/heceleme": ["hizliOkuma"],
  "/odak": ["odakProgrami"],
  "/exercises": ["hizliOkuma"],
  "/exercise2": ["hizliOkuma"],
  "/exercise3": ["hizliOkuma"],
  "/exercise4": ["hizliOkuma"],
  "/paragrafegzersiz": ["hizliOkuma"],
  "/oyun": ["hizliOkuma"],
  "/oyunkategori": ["hizliOkuma"],
};

// Kullanıcının belirli bir sayfaya erişim izni var mı kontrol et
export function hasAccess(userPackages, pagePath) {
  const requiredPackages = PAGE_PACKAGES[pagePath];

  if (!requiredPackages) {
    return true; // Paket tanımı yoksa erişim serbest
  }

  return requiredPackages.some((pkg) => userPackages[pkg] === true);
}

// Kullanıcının paketlerini localStorage'dan al
export function getUserPackages() {
  if (typeof window === "undefined") return {};

  const packages = localStorage.getItem("userPackages");
  return packages ? JSON.parse(packages) : {};
}
