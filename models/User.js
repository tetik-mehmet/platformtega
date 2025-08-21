import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  // Paket bilgileri (mevcut yapıyı koruyalım)
  packages: {
    hizliOkuma: { type: Boolean, default: false },
    temelIngilizce: { type: Boolean, default: false },
    odakProgrami: { type: Boolean, default: false },
  },

  // Abonelik bilgileri ekleyin
  subscription: {
    packageId: { type: String, default: null },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    isActive: { type: Boolean, default: false },
  },

  lastLogin: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
