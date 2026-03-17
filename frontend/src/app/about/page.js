import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | MAALAVYA ENTERPRISES',
  description: 'Learn about our deep expertise in manufacturing biomedical waste bins, garbage containers, and hospital furniture.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="bg-gray-900 border-b-8 border-brand-green py-20 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-green/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About <span className="text-brand-green">MAALAVYA</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Decades of excellence in manufacturing world-class biomedical waste management solutions and hospital furniture.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                At MAALAVYA ENTERPRISES, our mission is to empower healthcare professionals and municipal corporations by providing high-quality, durable, and precision-engineered medical equipment and waste management tools. We believe that access to reliable sanitation and medical tools directly saves lives and protects the environment.
              </p>
              
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Company History</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded with a core focus on public health infrastructure, we started as a regional supplier of hospital furniture and wheelbarrows. Over the decades, through relentless innovation in polymer molding and heavy-duty metal fabrication, we have expanded our catalog to include ISO certified biomedical waste bins and mobile garbage containers exported to over 50 countries globally.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-transform hover:-translate-y-1 group">
                <div className="text-brand-green text-5xl mb-4 group-hover:scale-110 transition-transform">⚙️</div>
                <h3 className="font-bold text-xl text-gray-900">ISO 9001</h3>
                <p className="text-gray-500 font-medium">Quality Systems</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-transform hover:-translate-y-1 group">
                <div className="text-brand-green text-5xl mb-4 group-hover:scale-110 transition-transform">♻️</div>
                <h3 className="font-bold text-xl text-gray-900">Eco-Friendly</h3>
                <p className="text-gray-500 font-medium">Sustainable Plastics</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-transform hover:-translate-y-1 group">
                <div className="text-brand-green text-5xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
                <h3 className="font-bold text-xl text-gray-900">Global Reach</h3>
                <p className="text-gray-500 font-medium">50+ Countries</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-transform hover:-translate-y-1 group">
                <div className="text-brand-green text-5xl mb-4 group-hover:scale-110 transition-transform">👥</div>
                <h3 className="font-bold text-xl text-gray-900">24/7 Support</h3>
                <p className="text-gray-500 font-medium">Dedicated Team</p>
              </div>
            </div>
          </div>

          {/* Quality Assurance Section */}
          <div className="mt-24 bg-white p-12 lg:p-16 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-bl-full"></div>
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center relative z-10">Quality Assurance guarantees</h2>
             <div className="prose prose-lg text-gray-700 mx-auto text-center max-w-4xl relative z-10">
               <p>
                 Our manufacturing facilities follow the strictest Good Manufacturing Practices. Every biomedical waste bin, mobile garbage container, and piece of hospital furniture undergoes rigorous multi-stage quality control checks — assessing tensile strength, wheel axis durability, and polymer UV resistance. We source only premium-grade raw materials, ensuring longevity, rust-resistance for steel products, and absolute hygiene for clinical environments.
               </p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
