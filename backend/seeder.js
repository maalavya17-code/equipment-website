require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const AdminUser = require("./models/AdminUser");

connectDB();

async function seedAdmin() {
  try {
    await AdminUser.deleteMany(); // Clear existing
    
    await AdminUser.create({
      email: "admin@maalavya.com",
      password: "Admin@123", // The AdminUser pre('save') hook will hash this automatically!
      role: "admin"
    });

    console.log("✅ Admin created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();