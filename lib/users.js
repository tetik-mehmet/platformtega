import connectDB from "./mongodb";
import User from "@/models/User";

export async function getUsers() {
  try {
    await connectDB();
    const users = await User.find({}).select("-password");
    return users;
  } catch (error) {
    console.error("getUsers error:", error);
    return [];
  }
}
