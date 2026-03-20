import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

async function getProduct(idOrSlug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${idOrSlug}`, { cache: 'no-store' });
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

  const getCleanCategory = (cat) => {
    const catName = typeof cat === 'string' ? cat : (cat?.name || 'Other');
    const lower = catName.toLowerCase();
    if (lower.includes('test') || lower.includes('debug') || lower.includes('automated') || /\d{4,}/.test(catName)) {
      return { _id: 'cat-other', name: 'Other', slug: 'other' };
    }
    if (typeof cat === 'string') {
      return { _id: `cat-${lower.replace(/[^a-z0-9]+/g, '-')}`, name: catName, slug: lower.replace(/[^a-z0-9]+/g, '-') };
    }
    return cat;
  };

  if (product) {
    product.category = getCleanCategory(product.category);
  }

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

  const applyCloudinaryTransform = (url, transformStr) => {
    if (!url || !url.includes('cloudinary.com') || !url.includes('/upload/')) return url;
    if (url.includes(`/upload/${transformStr}/`)) return url;
    return url.replace('/upload/', `/upload/${transformStr}/`);
  };

  const rawDefaultImage = product.images && product.images.length > 0 
    ? product.images[0]
    : 'https://via.placeholder.com/300x200';
    
  const defaultImage = applyCloudinaryTransform(rawDefaultImage, 'f_auto,q_95,w_800');

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
                 <div className="relative w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                   <Image src={defaultImage} alt={product.name} width={800} height={800} quality={70} className="w-full h-auto object-contain" />
                 </div>
                 {/* Thumbnails (If more than 1 image) */}
                 {product.images?.length > 1 && (
                   <div className="flex space-x-4 overflow-x-auto pb-2 w-full">
                     {product.images.map((img, idx) => {
                       const thumbImg = applyCloudinaryTransform(img, 'f_auto,q_80,w_100,h_100,c_fill');
                       return (
                         <div key={idx} className="w-24 h-24 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-brand-green transition-colors relative overflow-hidden">
                           <Image src={thumbImg} alt={`Thumbnail ${idx}`} width={100} height={100} quality={70} className="w-full h-full object-cover" />
                         </div>
                       );
                     })}
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
                 <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
                   {product.fullDescription}
                 </p>

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

          {/* Certifications & Compliance Section */}
          {product.certifications?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
              <div className="p-8 lg:p-12 bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Certifications & Compliance</h2>
                <div className="flex flex-wrap gap-4">
                  {product.certifications.map((cert, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 flex items-center shadow-sm">
                      <span className="text-brand-green mr-2">✓</span> {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
