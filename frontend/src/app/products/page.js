import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products`, { cache: 'no-store' }); // Always fresh for filtering if we do full page reloads
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: 'Our Products Catalog | MAALAVYA ENTERPRISES',
  description: 'Browse our complete catalog of biomedical waste bins, garbage containers, and hospital furniture.',
};

export default async function ProductsPage({ searchParams }) {
  const categories = await getCategories();
  const allProducts = await getProducts();
  
  // Need to await searchParams in Next.js 15
  const sp = await searchParams;
  const activeCategory = sp?.category || '';

  const filteredProducts = activeCategory
    ? allProducts.filter(p => p.category?.slug === activeCategory)
    : allProducts;

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="bg-gray-900 border-b-8 border-brand-green text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Product Catalog</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive range of high-quality biomedical waste bins, garbage containers, wheelbarrows, and hospital furniture.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/products" 
                    className={`block py-2 px-3 rounded-lg transition-colors ${!activeCategory ? 'bg-brand-green text-white font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-green'}`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link 
                      href={`/products?category=${cat.slug}`} 
                      scroll={false}
                      className={`block py-2 px-3 rounded-lg transition-colors ${activeCategory === cat.slug ? 'bg-brand-green text-white font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-brand-green'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <p className="text-gray-600 font-medium">
                 Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> results
                 {activeCategory && <span className="text-brand-green border border-brand-green ml-3 px-3 py-1 bg-teal-50 rounded-full text-sm">Filtered by category</span>}
               </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">We couldn't finding any products matching the selected category.</p>
                <Link href="/products" className="text-brand-green font-bold hover:underline">Clear Filters</Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
