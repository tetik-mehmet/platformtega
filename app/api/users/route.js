import { NextResponse } from "next/server";
import { getUsers } from "@/lib/users.js";

export async function GET() {
  try {
    const users = await getUsers();

    console.log("=== USERS API DEBUG ===");
    console.log("Kullanıcı sayısı:", users.length);
    console.log(
      "Kullanıcılar:",
      users.map((u) => ({ email: u.email, name: u.name }))
    );
    console.log("=== USERS API DEBUG END ===");

    // Şifreleri gizle
    const safeUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({
      users: safeUsers,
      count: users.length,
    });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json({ message: "Sunucu hatası" }, { status: 500 });
  }
}
