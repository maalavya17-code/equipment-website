import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getProducts({ page = 1, category = '' }) {
  const params = new URLSearchParams({ page, limit: 12 });
  if (category) params.append('category', category);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) return { products: [], pages: 1 };
  
  const data = await res.json();
  if (Array.isArray(data)) return { products: data, pages: 1 };
  return data;
}

export const metadata = {
  title: 'Our Products Catalog | MAALAVYA ENTERPRISES',
  description: 'Browse our complete catalog of biomedical waste bins, garbage containers, and hospital furniture.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }) {
  const getCleanCategory = (cat) => {
    // Accommodate both old object format and new string format safely
    const catName = typeof cat === 'string' ? cat : (cat?.name || 'Other');
    const lower = catName.toLowerCase();
    
    if (lower.includes('test') || lower.includes('debug') || lower.includes('automated') || /\d{4,}/.test(catName)) {
      return { _id: 'cat-other', name: 'Other', slug: 'other' };
    }
    
    // For string categories, we'll generate a consistent slug on the fly
    if (typeof cat === 'string') {
      return { 
        _id: `cat-${lower.replace(/[^a-z0-9]+/g, '-')}`, 
        name: catName, 
        slug: lower.replace(/[^a-z0-9]+/g, '-') 
      };
    }
    
    return cat;
  };

  const sp = await searchParams;
  const activeCategory = sp?.category || '';
  const currentPage = Number(sp?.page) || 1;

  let fetchedCategories = await getCategories();
  let productsData = await getProducts({ page: currentPage, category: activeCategory });
  
  let allProducts = productsData?.products || [];
  let totalPages = productsData?.pages || 1;

  // Process products to assign fallback "Other" to invalid or missing categories
  allProducts = allProducts.map(p => ({ ...p, category: getCleanCategory(p.category) }));

  // Build the clean category list for the sidebar
  const categoryMap = new Map();
  fetchedCategories.forEach(cat => {
    const cleanCat = getCleanCategory(cat);
    if (cleanCat.slug !== 'other') {
      categoryMap.set(cleanCat.slug, cleanCat);
    }
  });

  const categories = Array.from(categoryMap.values());
  categories.push({ _id: 'cat-other', name: 'Other', slug: 'other' });

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

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-1/5 xl:w-64 flex-shrink-0">
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
          <div className="w-full md:flex-1">
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
               <p className="text-gray-600 font-medium">
                 Showing <span className="font-bold text-gray-900">{allProducts.length}</span> results 
                 {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
                 {activeCategory && <span className="text-brand-green border border-brand-green ml-3 px-3 py-1 bg-teal-50 rounded-full text-sm">Filtered by category</span>}
               </p>
            </div>

            {allProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">We couldn't finding any products matching the selected criteria.</p>
                <Link href="/products" className="text-brand-green font-bold hover:underline">Clear Filters</Link>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <Link
                    key={pageNum}
                    href={`/products?page=${pageNum}${activeCategory ? `&category=${activeCategory}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${currentPage === pageNum ? 'bg-brand-green text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-green hover:text-brand-green'}`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
