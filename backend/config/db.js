const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    dns.setServers(['8.8.8.8']); // Bypassing local Windows SRV lookup failure
  } catch (dnsErr) {
    console.warn("⚠️ DNS override warning:", dnsErr.message);
  }
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;