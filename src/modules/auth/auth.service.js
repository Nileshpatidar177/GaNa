import bcrypt from "bcryptjs";
import User from "../../models/User.model.js";
import Artist from "../../models/Artist.model.js";
import Role from "../../models/Role.model.js";
import Otp from "../../models/Otp.model.js";
import { generateAccessToken } from "../../utils/generateToken.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { sendEmail } from "../../utils/sendEmail.js";

// =======================
// USER REGISTER
// =======================

export const registerUserService = async (data) => {
  const { firstName, lastName, username, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const userRole = await Role.findOne({ name: "user" });
  if (!userRole) throw new Error("User role not found");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    role: userRole._id,
    userType: "free",
  });

  const token = generateAccessToken(user._id, "user");

  return { user, token };
};

// =======================
// USER LOGIN
// =======================

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate("role");

  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  if (user.accountStatus !== "active") {
    throw new Error("Account is not active");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateAccessToken(user._id, user.role.name);

  return { user, token };
};

// =======================
// ARTIST REGISTER
// =======================

export const registerArtistService = async (data) => {
  const { artistName, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Artist already exists");

  const artistRole = await Role.findOne({ name: "artist" });
  if (!artistRole) throw new Error("Artist role not found");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName: artistName,
    email,
    password: hashedPassword,
    role: artistRole._id,
    accountStatus: "pending",
  });

  const artist = await Artist.create({
    user: user._id,
    artistName,
    approvalStatus: "pending",
  });

  const token = generateAccessToken(user._id, "artist");

  return { user, artist, token };
};

// =======================
// ADMIN / SUPER ADMIN SEND OTP
// =======================

export const sendOtpLoginService = async ({ email }) => {
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new Error("User not found");
  }

  const roleName = user.role?.name;

  if (!["admin", "super_admin"].includes(roleName)) {
    throw new Error("Only admin or super admin can login with OTP");
  }

  const otp = generateOtp();

  await Otp.updateMany(
    {
      email,
      role: roleName,
      purpose: "login",
      isUsed: false,
    },
    {
      isUsed: true,
    }
  );

  await Otp.create({
    email,
    otp,
    role: roleName,
    purpose: "login",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    isUsed: false,
  });

  await sendEmail({
    to: email,
    subject: "Music Platform Login OTP",
    text: `Your login OTP is ${otp}. This OTP is valid for 5 minutes.`,
  });

  return {
    role: roleName,
  };
};

export const verifyOtpLoginService = async ({ email, otp }) => {
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new Error("User not found");
  }

  const roleName = user.role?.name;

  if (!["admin", "super_admin"].includes(roleName)) {
    throw new Error("Only admin or super admin can verify OTP");
  }

  const otpRecord = await Otp.findOne({
    email,
    otp,
    role: roleName,
    purpose: "login",
    isUsed: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    throw new Error("Invalid or expired OTP");
  }

  otpRecord.isUsed = true;
  await otpRecord.save();

  user.lastLogin = new Date();
  await user.save();

  const token = generateAccessToken(user._id, roleName);

  return {
    user,
    token,
  };
};