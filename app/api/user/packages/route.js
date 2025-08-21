import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  try {
    await connectDB();

    // Email parametresini al
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email gerekli" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("packages");

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      packages: user.packages,
    });
  } catch (error) {
    console.error("Paket kontrol hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// Paket güncelleme (admin için)
export async function PUT(request) {
  try {
    await connectDB();

    const { email, packages } = await request.json();

    const user = await User.findOneAndUpdate(
      { email },
      { packages },
      { new: true }
    ).select("packages");

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      packages: user.packages,
    });
  } catch (error) {
    console.error("Paket güncelleme hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
