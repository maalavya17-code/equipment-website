import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'MAALAVYA ENTERPRISES | Manufacturer of Biomedical Waste Bins & Hospital Furniture',
  description: 'Leading manufacturer and supplier of biomedical waste bins, garbage containers, wheelbarrows, plastic pallets, and premium hospital furniture.',
};

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?limit=4`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 4) : null;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  // Hardcoded Categories according to user mandate
  const categories = [
    { name: 'Biomedical Waste Bins', icon: '♻️', desc: 'Secure medical waste disposal bins' },
    { name: 'Garbage Containers', icon: '🗑️', desc: 'Heavy-duty industrial & municipal bins' },
    { name: 'Wheelbarrows', icon: '🛒', desc: 'Durable construction & utility wheelbarrows' },
    { name: 'Garbage Stations', icon: '🏢', desc: 'Multi-compartment waste segregation' },
    { name: 'Plastic Pallets', icon: '📦', desc: 'Hygienic storage and transport pallets' },
    { name: 'Hospital Furniture', icon: '🛏️', desc: 'Premium wards and ICU furniture' },
    { name: 'OT Tables', icon: '⚡', desc: 'Precision operating theater tables' },
    { name: 'Hospital Trolleys', icon: '🚑', desc: 'Crash carts, linen, and medicine trolleys' },
    { name: 'Stretchers', icon: '🛏️', desc: 'Emergency response stretchers' },
  ];

  // Placeholder Featured Products
  const placeholderProducts = [
    { _id: '1', slug: 'biomedical-bin-60l', name: '60L Biomedical Waste Bin (Yellow)', shortDescription: 'Foot-pedal operated medical grade bin for infectious waste.', category: { name: 'Biomedical Waste Bins' } },
    { _id: '2', slug: 'mobile-garbage-container-240l', name: '240L Mobile Garbage Container', shortDescription: 'UV stabilized HDPE container with solid rubber wheels.', category: { name: 'Garbage Containers' } },
    { _id: '3', slug: 'electric-ot-table-pro', name: 'Electric OT Table ProSeries', shortDescription: 'Advanced electro-hydraulic operating table with C-Arm compatibility.', category: { name: 'OT Tables' } },
    { _id: '4', slug: 'heavy-duty-wheelbarrow', name: 'Heavy Duty Wheelbarrow 100L', shortDescription: 'Galvanized steel tray with pneumatic tire for rough terrains.', category: { name: 'Wheelbarrows' } },
  ];

  const fetchedProducts = await getFeaturedProducts();
  const featuredProducts = (fetchedProducts && fetchedProducts.length > 0) ? fetchedProducts : placeholderProducts;

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gray-900 border-b-8 border-brand-green overflow-hidden">
          {/* Abstract geometric background layer instead of relying on external image right now */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-brand-green w-[800px] h-[800px] rounded-full blur-[120px] top-1/2 left-1/4"></div>
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 w-[600px] h-[600px] rounded-full blur-[100px] top-1/2 left-3/4"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex items-center min-h-[600px]">
            <div className="max-w-3xl">
              <span className="inline-block py-1 px-3 rounded text-sm font-bold tracking-wider text-green-400 bg-green-500/10 mb-6 uppercase border border-green-500/20">
                Premium Manufacturers & Suppliers
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
  <span className="text-white">Redefining Quality in </span>
  <span className="text-green-400">Waste Management</span>
  <span className="text-gray-200"> & Hospital Furniture</span>
</h1>
              
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl text-justify">
                <strong>MAALAVYA ENTERPRISES</strong> delivers uncompromising durability across our extensive catalog of biomedical waste bins, garbage containers, wheelbarrows, and precision medical furniture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="bg-brand-green hover:bg-brand-green-light text-white font-bold text-lg py-4 px-8 rounded flex items-center justify-center transition-all shadow-lg hover:shadow-brand-green/30 hover:-translate-y-1">
                  View Full Catalog
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-lg py-4 px-8 rounded flex items-center justify-center transition-all">
                  Request Quotation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES GRID SECTION */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 relative inline-block pb-4">
                Product Categories
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-brand-green rounded-full"></span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <Link key={idx} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all hover:-translate-y-1">
                  <div className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors">{cat.name}</h3>
                    <p className="text-gray-500">{cat.desc}</p>
                    <div className="mt-6 flex items-center text-brand-green font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      Explore Series <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </div>
                </Link>
               ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block">Top Rated</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Featured Products</h2>
              </div>
              <Link href="/products" className="text-brand-green font-bold hover:underline hidden md:flex items-center mt-4 md:mt-0">
                View all products <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {featuredProducts.map((product) => (
                 <ProductCard key={product._id} product={product} />
               ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
               <Link href="/products" className="inline-flex bg-gray-900 text-white font-bold py-3 px-8 rounded hover:bg-brand-green transition-colors">
                 View all products
               </Link>
            </div>
          </div>
        </section>

        {/* CLIENTS SECTION */}
        <section className="py-16 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-lg font-bold text-gray-500 uppercase tracking-widest mb-10">Trusted by 500+ Hospitals, Municipalities & Clinics Worldwide</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
              {/* Fake Logos */}
              <div className="text-3xl font-black text-gray-800">APOLLO<span className="font-light">Med</span></div>
              <div className="text-3xl font-black text-gray-800"><span className="text-brand-green">Global</span>Care.</div>
              <div className="text-3xl font-black text-gray-800">City<span className="text-blue-600">Corp</span></div>
              <div className="text-3xl font-black text-gray-800">MAX<span className="font-light">Health</span></div>
              <div className="text-3xl font-black text-gray-800">Medanta</div>
            </div>
          </div>
        </section>

        {/* ABOUT + TESTIMONIALS SPLIT SECTION */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* About Blurb */}
            <div>
              <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-2 block">About Our Company</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-blue-600">Reliability</span> for a Healthier Planet.
              </h2>
              <div className="w-20 h-1.5 bg-brand-green mb-8 rounded-full"></div>
              
              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Established with a vision to revolutionize medical hardware and industrial waste management, <strong>MAALAVYA ENTERPRISES</strong> has grown to become India's most trusted name in manufacturing biomedical waste receptacles, robust wheelbarrows, and specialized hospital furniture.
                </p>
                <p>
                  Our ISO certified facilities utilize advanced polymer molding and precision metallurgy to output products that strictly adhere to international safety standards. With a vast distribution network, we supply municipal corporations, global NGOs, and tier-1 hospital chains.
                </p>
              </div>

              <div className="flex gap-6 mb-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-gray-900">25+</span>
                  <span className="text-brand-green font-bold">Years Experience</span>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-extrabold text-gray-900">50+</span>
                  <span className="text-brand-green font-bold">Countries Exported</span>
                </div>
              </div>

              <Link href="/about" className="inline-block bg-white text-brand-green border-2 border-brand-green font-bold py-3 px-8 rounded hover:bg-brand-green hover:text-white transition-colors">
                Read Full Story
              </Link>
            </div>

            {/* Testimonials Side */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-green transform translate-x-4 translate-y-4 rounded-3xl opacity-10"></div>
              <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 relative">
                <svg className="w-16 h-16 text-brand-green opacity-20 absolute top-8 right-8" fill="currentColor" viewBox="0 0 32 32"><path d="M10.743 6.643c-6.195 0-10.743 4.241-10.743 10.975 0 5.617 4.148 9.739 9.608 9.739 4.341 0 8.056-2.502 8.056-6.84 0-4.048-2.985-6.643-6.45-6.643-1.155 0-2.31.289-3.272.771-.384-2.693 1.346-6.064 4.521-7.026l-1.72-1.076zm18.311 0c-6.195 0-10.743 4.241-10.743 10.975 0 5.617 4.148 9.739 9.608 9.739 4.341 0 8.056-2.502 8.056-6.84 0-4.048-2.985-6.643-6.45-6.643-1.155 0-2.31.289-3.272.771-.384-2.693 1.346-6.064 4.521-7.026l-1.72-1.076z"></path></svg>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Client Testimonials</h3>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex text-yellow-500 mb-2">★★★★★</div>
                    <p className="text-gray-700 font-medium italic mb-4 leading-relaxed">
                      "We procured 5,000 biomedical waste bins for our district. The quality of the pedal mechanism and the thickness of the plastic far exceeded our expectations. Maalavya delivered on time."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-bold text-gray-500">DK</div>
                      <div>
                        <h4 className="font-bold text-gray-900">Dr. Dheeraj Kumar</h4>
                        <p className="text-sm text-gray-500">Chief Medical Officer, Health Dept.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-gray-100">
                    <div className="flex text-yellow-500 mb-2">★★★★★</div>
                    <p className="text-gray-700 font-medium italic mb-4 leading-relaxed">
                      "Their heavy duty wheelbarrows and garbage containers have withstood incredibly rough use at our municipal dumping grounds. Extremely robust construction."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center font-bold text-gray-500">SS</div>
                      <div>
                        <h4 className="font-bold text-gray-900">Sanjay Singh</h4>
                        <p className="text-sm text-gray-500">Director Procurement, City Corp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}