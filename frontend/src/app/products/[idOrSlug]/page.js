import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getProduct(idOrSlug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${idOrSlug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { idOrSlug } = await params;
  const product = await getProduct(idOrSlug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | MAALAVYA ENTERPRISES`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }) {
  const { idOrSlug } = await params;
  const product = await getProduct(idOrSlug);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-100 max-w-lg">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-8">The medical equipment you are looking for does not exist or has been removed.</p>
            <Link href="/products" className="bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors">
              Return to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const defaultImage = product.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-500 flex items-center space-x-2">
            <Link href="/" className="hover:text-brand-green">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-green">Products</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/products?category=${product.category.slug}`} className="hover:text-brand-green">{product.category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Product Gallery */}
              <div className="p-8 lg:p-12 lg:border-r border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center">
                 <div className="relative w-full aspect-square bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 p-4">
                   <img src={defaultImage} alt={product.name} className="w-full h-full object-contain" />
                 </div>
                 {/* Thumbnails (If more than 1 image) */}
                 {product.images?.length > 1 && (
                   <div className="flex space-x-4 overflow-x-auto pb-2 w-full">
                     {product.images.map((img, idx) => (
                       <div key={idx} className="w-24 h-24 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-brand-green transition-colors">
                         <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                       </div>
                     ))}
                   </div>
                 )}
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12 flex flex-col">
                 <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                 {product.category && (
                   <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green font-semibold text-sm rounded-full mb-6 w-fit">
                     {product.category.name}
                   </span>
                 )}
                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                   {product.shortDescription}
                 </p>
                 
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                   <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                     <span className="text-brand-green mr-2">⭐</span> Key Advantages
                   </h3>
                   <ul className="space-y-3">
                     {product.features?.length > 0 ? (
                       product.features.map((opt, i) => (
                         <li key={i} className="flex items-start">
                           <svg className="w-5 h-5 text-brand-green mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                           </svg>
                           <span className="text-gray-700">{opt}</span>
                         </li>
                       ))
                     ) : (
                       <li className="text-gray-500 italic">No specific features listed.</li>
                     )}
                   </ul>
                 </div>

                 <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                   <Link href="/contact" className="flex-1 bg-brand-green hover:bg-brand-green-light text-white text-center font-bold py-4 px-8 rounded-xl shadow-md transition-colors text-lg flex items-center justify-center">
                     Request Quotation
                   </Link>
                   {product.brochureFile && (
                     <a href={`${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000'}${product.brochureFile}`} target="_blank" rel="noreferrer" className="sm:w-1/3 bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-center font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center">
                       📄 Brochure
                     </a>
                   )}
                 </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs: Specs & Full Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            {/* Very simple Tab-like vertical stack for static Server Component */}
            
            <div className="p-8 lg:p-12 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed font-serif whitespace-pre-wrap">
                {product.fullDescription}
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
              {product.specifications?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                          <th className="py-4 px-6 font-semibold text-gray-900 w-1/3 align-top">{spec.key}</th>
                          <td className="py-4 px-6 text-gray-700">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No technical specifications provided for this product.</p>
              )}
            </div>
            
            {product.certifications?.length > 0 && (
              <div className="p-8 lg:p-12 bg-gray-50 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications & Compliance</h2>
                <div className="flex flex-wrap gap-4">
                  {product.certifications.map((cert, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 flex items-center shadow-sm">
                      <span className="text-brand-green mr-2">✓</span> {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
