'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip guard for login page
    if (pathname === '/admin/login') {
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

  if (pathname === '/admin/login') return children;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-green text-white flex flex-col shadow-lg border-r-0 z-10 w-64 fixed h-full shrink-0">
        <div className="p-6 border-b border-green-800">
          <h2 className="text-xl font-bold tracking-wider text-white">MAALAVYA Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium">Dashboard Overview</Link>
          <Link href="/admin/products" className="block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium">Products Catalog</Link>
          <Link href="/admin/enquiries" className="block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium">Enquiries Inbox</Link>
          <Link href="/admin/content" className="block px-4 py-3 rounded-lg hover:bg-brand-green-light transition-colors font-medium">Site Content</Link>
        </nav>
        <div className="p-4 border-t border-green-800">
          <button onClick={handleLogout} className="w-full px-4 py-3 text-left rounded-lg text-red-300 hover:bg-red-500 hover:text-white transition-colors font-medium">
            Logout
          </button>
          <Link href="/" className="block mt-4 text-center text-sm text-green-200 hover:underline">
            View Public Site →
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto ml-64 min-h-screen w-[calc(100%-16rem)] flex-grow">
        {children}
      </main>
    </div>
  );
}
