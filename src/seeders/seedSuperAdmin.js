import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Role from "../models/Role.model.js";
import User from "../models/User.model.js";

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const roles = [
      {
        name: "user",
        displayName: "User",
        description: "Normal platform user",
      },
      {
        name: "artist",
        displayName: "Artist",
        description: "Music artist",
      },
      {
        name: "admin",
        displayName: "Admin",
        description: "Platform admin",
      },
      {
        name: "super_admin",
        displayName: "Super Admin",
        description: "Platform owner",
      },
    ];

    for (const role of roles) {
      await Role.findOneAndUpdate(
        { name: role.name },
        role,
        { upsert: true, new: true }
      );
    }

    const superAdminRole = await Role.findOne({ name: "super_admin" });

    const existing = await User.findOne({
      email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (existing) {
      console.log("Super Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.SUPER_ADMIN_PASSWORD,
      10
    );

    await User.create({
      firstName: "Super",
      lastName: "Admin",
      username: "superadmin",
      email: process.env.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      role: superAdminRole._id,
      accountStatus: "active",
      emailVerified: true,
    });

    console.log("Super Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSuperAdmin();