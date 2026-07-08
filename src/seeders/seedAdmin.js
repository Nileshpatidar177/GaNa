import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Role from "../models/Role.model.js";
import User from "../models/User.model.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminRole = await Role.findOne({ name: "admin" });

    if (!adminRole) {
      throw new Error("Admin role not found");
    }

    const existing = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      firstName: "Admin",
      lastName: "User",
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: adminRole._id,
      accountStatus: "active",
      emailVerified: true,
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();