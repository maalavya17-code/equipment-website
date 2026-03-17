import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-md relative z-50">
      {/* Top Contact Bar */}
      <div className="bg-brand-green text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
             <span className="flex items-center">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               info@maalavya.com
             </span>
             <span className="flex items-center">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
               +91 98765 43210
             </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
             <Link href="/about" className="hover:text-white/80 transition">Our Company</Link>
             <span>|</span>
             <Link href="/contact" className="hover:text-white/80 transition">Dealership Setup</Link>
             <span>|</span>
             <Link href="/admin/login" className="hover:text-white/80 transition text-white/50">Admin</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-extrabold text-brand-green tracking-tight">MAALAVYA</span>
              <span className="text-sm font-semibold text-gray-600 tracking-[0.2em] leading-none uppercase">Enterprises</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-800 hover:text-brand-green font-bold transition-colors text-lg">Home</Link>
            <Link href="/about" className="text-gray-800 hover:text-brand-green font-bold transition-colors text-lg">About Us</Link>
            <div className="relative group">
              <Link href="/products" className="text-gray-800 hover:text-brand-green font-bold transition-colors text-lg flex items-center">
                Our Products
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>
              {/* Simple dropdown indicator for design purposes */}
            </div>
            <Link href="/contact" className="text-gray-800 hover:text-brand-green font-bold transition-colors text-lg">Contact Us</Link>
            
            <Link href="/contact" className="ml-4 bg-brand-green border-2 border-brand-green text-white px-6 py-2.5 rounded text-lg font-bold hover:bg-white hover:text-brand-green transition-all shadow-md">
              Send Enquiry
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-brand-green hover:text-brand-green-dark focus:outline-none">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
