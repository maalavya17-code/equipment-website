'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const publicPaths = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip guard for explicitly public paths
    if (publicPaths.includes(pathname)) {
      setIsAuthenticated(true);
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  if (publicPaths.includes(pathname)) return children;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-green text-white shadow-lg fixed h-full z-10">
        <div className="p-6 border-b border-green-800 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-wider text-white">MAALAVYA Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className={`block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium ${pathname === '/admin' ? 'bg-brand-green-dark' : ''}`}>Dashboard</Link>
          <Link href="/admin/products" className={`block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium ${pathname.includes('/products') ? 'bg-brand-green-dark' : ''}`}>Products</Link>
          <Link href="/admin/enquiries" className={`block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium ${pathname.includes('/enquiries') ? 'bg-brand-green-dark' : ''}`}>Enquiries</Link>
          <Link href="/admin/content" className={`block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium ${pathname.includes('/content') ? 'bg-brand-green-dark' : ''}`}>Content</Link>
        </nav>
        <div className="p-4 border-t border-green-800">
          <button onClick={handleLogout} className="w-full px-4 py-3 text-left rounded-lg text-red-300 hover:bg-red-500 hover:text-white transition-colors font-medium">
            Logout
          </button>
          <Link href="/" className="block mt-4 text-center text-sm text-green-200 hover:underline mb-2">
            View Public Site →
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-4 md:p-8 ml-0 md:ml-64 w-full md:w-[calc(100%-16rem)] min-h-screen pb-24 md:pb-8 max-w-full overflow-x-hidden">
        {/* Mobile Header (Top bar) */}
        <div className="md:hidden flex justify-between items-center bg-brand-green text-white p-4 rounded-xl mb-6 shadow-sm">
          <h2 className="text-lg font-bold tracking-wider">MAALAVYA Admin</h2>
          <button onClick={handleLogout} className="text-sm bg-red-500 px-3 py-1.5 rounded text-white font-semibold shadow-sm hover:bg-red-600">Logout</button>
        </div>
        
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-8px_15px_-3px_rgba(0,0,0,0.1)] z-50 flex justify-around items-center p-2 pb-4">
        <Link href="/admin" className={`flex flex-col items-center p-2 w-full ${pathname === '/admin' ? 'text-brand-green font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
          <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span className="text-[10px] uppercase font-bold tracking-wide mt-0.5">Dashboard</span>
        </Link>
        <Link href="/admin/products" className={`flex flex-col items-center p-2 w-full ${pathname.includes('/products') ? 'text-brand-green font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
          <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <span className="text-[10px] uppercase font-bold tracking-wide mt-0.5">Products</span>
        </Link>
        <Link href="/admin/enquiries" className={`flex flex-col items-center p-2 w-full ${pathname.includes('/enquiries') ? 'text-brand-green font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
          <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          <span className="text-[10px] uppercase font-bold tracking-wide mt-0.5">Enquiries</span>
        </Link>
        <Link href="/admin/content" className={`flex flex-col items-center p-2 w-full ${pathname.includes('/content') ? 'text-brand-green font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
          <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          <span className="text-[10px] uppercase font-bold tracking-wide mt-0.5">Content</span>
        </Link>
      </nav>
    </div>
  );
}
