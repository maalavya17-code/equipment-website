'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, enquiries: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we would have a dedicated /api/admin/stats endpoint
    // Here we'll just fetch raw lengths from the endpoints using the token
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const headers = { Authorization: `Bearer ${token}` };

        const [prodRes, enqRes, catRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/enquiries`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories`)
        ]);

        const products = prodRes.ok ? await prodRes.json() : [];
        const enquiries = enqRes.ok ? await enqRes.json() : [];
        const categories = catRes.ok ? await catRes.json() : [];

        setStats({
          products: products.length,
          enquiries: enquiries.length,
          categories: categories.length
        });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-teal-50 text-brand-teal rounded-lg mr-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.products}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-50 text-brand-blue rounded-lg mr-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Total Enquiries</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.enquiries}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-lg mr-4">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 1m-4 8v3m0 4v3m4 8h-4" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Product Categories</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.categories}</h3>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
         <p className="text-gray-600 mb-6">Use the sidebar to navigate to specific management sections.</p>
      </div>
    </div>
  );
}
