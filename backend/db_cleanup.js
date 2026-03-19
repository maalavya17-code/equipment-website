require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

// Load models
const Category = require('./models/Category');
const Product = require('./models/Product');

async function runCleanup() {
  try {
    dns.setServers(['8.8.8.8']);
  } catch(e) {}

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Delete the "Automated Test Cat"
    const testCatResult = await Category.deleteOne({ name: "Automated Test Cat 1773737289728" });
    console.log(`Deleted test category:`, testCatResult);

    // 2. Fetch all products and replace ObjectIds with valid category Names
    const products = await Product.find({});
    console.log(`Found ${products.length} products to migrate.`);

    for (const product of products) {
      if (!product.category) continue;
      
      let categoryNameStr = product.category; // Initial value might be ObjectId or already a string

      // If it's an ObjectId, let's look it up
      if (mongoose.Types.ObjectId.isValid(product.category) && typeof product.category !== 'string') {
        const cat = await Category.findById(product.category);
        if (cat) {
          categoryNameStr = cat.name;
        } else {
          categoryNameStr = "Other"; // Fallback if category doesn't exist anymore
        }
      } else if (typeof product.category === 'object' && product.category._id) {
         // populated case
         categoryNameStr = product.category.name;
      }

      // Check if it's the test category or invalid
      if (typeof categoryNameStr === 'string') {
         if (categoryNameStr.includes('Automated') || categoryNameStr.includes('Test')) {
            categoryNameStr = "Other";
         }
      } else {
         // Convert objectId toString if lookup failed
         const cat = await Category.findById(product.category.toString());
         categoryNameStr = cat ? cat.name : "Other";
      }

      // Exact match standard list
      const validCategories = [
        "Garbage Bins", "Garbage Containers", "Garbage Stations", "Biomedical Waste Bins",
        "Hospital Trolleys", "Stretchers", "Hospital Furniture", "Wheelbarrows", 
        "Plastic Pallets", "OT Tables", "Other"
      ];
      
      if (!validCategories.includes(categoryNameStr)) {
         categoryNameStr = "Other";
      }

      // Update directly in DB to bypass schema validation temporarily
      await mongoose.connection.collection('products').updateOne(
        { _id: product._id },
        { $set: { category: categoryNameStr } }
      );
    }

    console.log('Migration complete. Products now use string categories.');
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

runCleanup();
