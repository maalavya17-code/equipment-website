import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getExhibitions() {
  const res = await fetch('http://localhost:5000/api/content/exhibitions', { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: 'Global Exhibitions & Events | MediEquip Pro',
  description: 'Meet our team at leading medical trade shows and healthcare exhibitions worldwide.',
};

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Global Exhibitions & Events</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our experts in person, explore our latest innovations, and experience our complete range of healthcare solutions.
            </p>
          </div>

          {exhibitions.length > 0 ? (
            <div className="space-y-12">
              {exhibitions.map((expo) => (
                <div key={expo._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-shadow">
                   {/* Fake Image Placeholder since expo.galleryImages might exist */}
                   <div className="md:w-1/3 bg-brand-blue/5 min-h-[250px] relative flex items-center justify-center p-8 border-r border-gray-100">
                     {expo.galleryImages?.[0] ? (
                       <img src={expo.galleryImages[0]} alt={expo.title} className="w-full h-full object-cover absolute inset-0" />
                     ) : (
                       <div className="text-brand-blue opacity-50 text-center">
                         <span className="text-6xl block mb-2">🎪</span>
                         <span className="font-semibold">{expo.title}</span>
                       </div>
                     )}
                   </div>
                   <div className="p-8 md:w-2/3 flex flex-col justify-center">
                     <span className="inline-block px-3 py-1 bg-teal-50 text-brand-teal font-semibold text-sm rounded-full mb-4 w-fit">
                       {new Date(expo.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                     </span>
                     <h2 className="text-3xl font-bold text-gray-900 mb-2">{expo.title}</h2>
                     <p className="text-gray-500 font-medium mb-4 flex items-center">
                       <span className="mr-2">📍</span> {expo.location}
                     </p>
                     <p className="text-gray-700 leading-relaxed mb-6">
                       {expo.description}
                     </p>
                     <Link href="/contact" className="text-brand-teal font-bold hover:text-brand-teal-light flex items-center group-hover:underline">
                       Schedule a Meeting <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                     </Link>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-5xl block mb-4">📅</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Upcoming Events</h3>
              <p className="text-gray-500 mb-6">We are finalizing our exhibition schedule. Please check back later.</p>
              <Link href="/contact" className="inline-block bg-brand-teal text-white font-bold py-3 px-8 rounded-full hover:bg-brand-teal-light transition-colors">
                Contact Sales Instead
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
