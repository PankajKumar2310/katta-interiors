import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Product from '../models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/katta_interiors';

const categories = [
  {
    name: 'Sunmica',
    subcategories: [
      '1mm – Kridha',
      '0.8mm – Rockstar',
      'Doorskin – Rockstar',
      '1.3mm – Thermoluxe',
      'Pastels – Trustlam',
    ],
  },
  {
    name: 'Panels',
    subcategories: ['Louvers', 'Sheets', 'Iris Curve'],
  },
];

const thicknesses = ['1mm', '0.8mm', '1.3mm', 'N/A'];
const finishes = ['Matte', 'Gloss', 'Textured', 'Metallic'];

const generateProducts = (count = 200) => {
  const generated = [];
  const subcategoryPairs = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({ category: cat.name, subcategory: sub }))
  );

  for (let i = 1; i <= count; i++) {
    const pair = subcategoryPairs[i % subcategoryPairs.length];

    generated.push({
      name: `${pair.subcategory} Product #${i}`,
      category: pair.category,
      subcategory: pair.subcategory,
      thickness: thicknesses[i % thicknesses.length],
      finish: finishes[i % finishes.length],
      price: Math.floor(Math.random() * 950 + 50),
      image: `https://via.placeholder.com/400x400.png?text=Product+${i}`,
      description:
        `This is a high-quality placeholder product, perfect for demonstrating the layout and functionality of the shop. This is product number ${i}.`,
      specs: {
        Material: 'Placeholder Material',
        Durability: 'High',
        Usage: 'Various Applications',
        Size: 'Standard',
      },
      isFeatured: i <= 8,
    });
  }

  return generated;
};

const run = async () => {
  await mongoose.connect(MONGO_URI, { dbName: 'katta_interiors' });

  await Product.deleteMany({});

  const docs = generateProducts(200);
  await Product.insertMany(docs);

  console.log(`Seeded ${docs.length} products`);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
