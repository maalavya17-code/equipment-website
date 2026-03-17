import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-brand-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link href="/" className="mb-6 block inline-block">
              <span className="text-3xl font-extrabold text-white tracking-tight block">MAALAVYA</span>
              <span className="text-sm font-semibold text-brand-green tracking-[0.2em] leading-none uppercase block">Enterprises</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leading ISO Certified Manufacturers & Exporters of Biomedical Waste Bins, Garbage Containers, Plastic Pallets, and high-quality Hospital Furniture.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholder */}
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-brand-green transition-colors text-white">FB</a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-brand-green transition-colors text-white">IN</a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-brand-green transition-colors text-white">TW</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-b-2 border-brand-green pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> About Us</Link></li>
              <li><Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> All Products</Link></li>
              <li><Link href="/clients" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Our Clients</Link></li>
              <li><Link href="/contact" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-b-2 border-brand-green pb-2 inline-block">Top Categories</h4>
            <ul className="space-y-3 text-sm flex flex-col">
              <Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Biomedical Waste Bins</Link>
              <Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Garbage Containers</Link>
              <Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Plastic Pallets</Link>
              <Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> OT Tables</Link>
              <Link href="/products" className="hover:text-brand-green transition-colors flex items-center"><span className="text-brand-green mr-2">›</span> Hospital Furniture</Link>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-b-2 border-brand-green pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-brand-green mt-1 mr-3 text-lg border border-gray-700 p-2 rounded-full bg-gray-800">📍</span>
                <span>123 Industrial Phase I, City Name, State, India - 123456</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mt-1 mr-3 text-lg border border-gray-700 p-2 rounded-full bg-gray-800">📞</span>
                <span>+91 98765 43210<br/>+91 12345 67890</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-green mt-1 mr-3 text-lg border border-gray-700 p-2 rounded-full bg-gray-800">✉️</span>
                <span>info@maalavya.com<br/>sales@maalavya.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MAALAVYA ENTERPRISES. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
