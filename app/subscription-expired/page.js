"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubscriptionExpiredPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPackages");
    localStorage.removeItem("userData");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Aboneliğiniz Sona Erdi
          </h1>
          <p className="text-gray-600">
            Üzgünüz, aboneliğiniz aktif değil. Hizmetlerimize devam etmek için
            lütfen aboneliğinizi yenileyin.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Aboneliği Yenile
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
