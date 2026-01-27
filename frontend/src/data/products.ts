export interface Product {
  id: string;
  name: string;
  category: 'Sunmica' | 'Panels';
  subcategory: string;
  thickness?: string;
  finish?: string;
  price: number;
  image: string;
  description: string;
  specs: { [key: string]: string };
}

export const categories = [
  { name: 'Sunmica', subcategories: ['1mm – Kridha', '0.8mm – Rockstar', 'Doorskin – Rockstar', '1.3mm – Thermoluxe', 'Pastels – Trustlam'] },
  { name: 'Panels', subcategories: ['Louvers', 'Sheets', 'Iris Curve'] }
];

const thicknesses = ['1mm', '0.8mm', '1.3mm', 'N/A'];
const finishes = ['Matte', 'Gloss', 'Textured', 'Metallic'];

const generatedProducts: Product[] = [];
const subcategoryPairs = categories.flatMap(cat => cat.subcategories.map(sub => ({ category: cat.name, subcategory: sub })));

for (let i = 1; i <= 1000; i++) {
  const subcatPair = subcategoryPairs[i % subcategoryPairs.length];
  
  generatedProducts.push({
    id: i.toString(),
    name: `${subcatPair.subcategory} Product #${i}`,
    category: subcatPair.category as 'Sunmica' | 'Panels',
    subcategory: subcatPair.subcategory,
    thickness: thicknesses[i % thicknesses.length],
    finish: finishes[i % finishes.length],
    price: Math.floor(Math.random() * (950) + 50), // Price between 50 and 1000
    image: `https://via.placeholder.com/400x400.png?text=Product+${i}`,
    description: `This is a high-quality placeholder product, perfect for demonstrating the layout and functionality of the shop. This is product number ${i}.`,
    specs: {
      'Material': 'Placeholder Material',
      'Durability': 'High',
      'Usage': 'Various Applications',
      'Size': 'Standard'
    }
  });
}

export const products: Product[] = generatedProducts;

export const featuredProducts = products.slice(0, 8);