require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const AdminUser = require("./models/AdminUser");

connectDB();

async function seedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("❌ Admin credentials missing in .env");
      return process.exit();
    }

    const existingAdmin = await AdminUser.findOne({ email });

    if (!existingAdmin) {
      await AdminUser.create({
        email,
        password,
        role: "admin"
      });

    } else {

    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();