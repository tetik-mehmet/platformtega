"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Frontend validasyonu
    if (!form.name || !form.surname || !form.email || !form.password) {
      setError("Lütfen tüm alanları doldurun.");
      setLoading(false);
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Geçerli bir e-posta adresi girin.");
      setLoading(false);
      return;
    }

    // Şifre uzunluğu kontrolü
    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      setLoading(false);
      return;
    }

    try {
      // API endpoint'i buraya gelecek
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Başarılı kayıt
        setSuccess(true);
        setForm({ name: "", surname: "", email: "", password: "" });

        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Hata durumu
        setError(
          data.message || "Kayıt işlemi başarısız. Lütfen tekrar deneyin."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 text-gray-800 font-sans">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl space-y-6 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 tracking-tight drop-shadow-sm">
          Üye Ol
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ad"
            className="w-full px-5 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 transition placeholder:text-blue-300 text-base"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            style={{ fontFamily: "var(--font-family)" }}
          />
          <input
            type="text"
            name="surname"
            placeholder="Soyad"
            className="w-full px-5 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 transition placeholder:text-blue-300 text-base"
            value={form.surname}
            onChange={handleChange}
            disabled={loading}
            style={{ fontFamily: "var(--font-family)" }}
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            className="w-full px-5 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 transition placeholder:text-blue-300 text-base"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            style={{ fontFamily: "var(--font-family)" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            className="w-full px-5 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 transition placeholder:text-blue-300 text-base"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            style={{ fontFamily: "var(--font-family)" }}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition flex items-center justify-center shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            style={{ fontFamily: "var(--font-family)" }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Kayıt Yapılıyor...
              </>
            ) : (
              "Kayıt Ol"
            )}
          </button>
          {error && (
            <div
              className="text-red-600 text-center text-sm"
              style={{ fontFamily: "var(--font-family)" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="text-green-600 text-center text-sm"
              style={{ fontFamily: "var(--font-family)" }}
            >
              Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
            </div>
          )}
        </form>
        <p
          className="text-sm text-center text-gray-600 mt-4"
          style={{ fontFamily: "var(--font-family)" }}
        >
          Zaten hesabınız var mı?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Giriş Yap
          </a>
        </p>
      </div>
    </main>
  );
}
