'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Base URLs (safe for both local + production)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', '');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');

      await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>

        <Link
          href="/admin/products/add"
          className="bg-brand-green text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-green-light transition-colors"
        >
          + Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 font-semibold text-gray-700">Image</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Name</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Category</th>
              <th className="py-4 px-6 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((prod) => {
                const imagePath = prod.images?.[0];

                return (
                  <tr
                    key={prod._id}
                    className="border-b border-gray-100 hover:bg-gray-50/50"
                  >
                    <td className="py-4 px-6">
                      <img
                        src={
                          imagePath
                            ? (imagePath.startsWith('http') ? imagePath : `${BASE_URL}/${imagePath}`)
                            : 'https://dummyimage.com/400x300/000/fff'
                        }
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded bg-gray-100"
                      />
                    </td>

                    <td className="py-4 px-6 font-medium text-gray-900">
                      {prod.name}
                    </td>

                    <td className="py-4 px-6 text-gray-500">
                      {prod.category?.name || 'Uncategorized'}
                    </td>

                    <td className="py-4 px-6 text-right space-x-3">
                      <Link
                        href={`/admin/products/${prod._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(prod._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">
                  No products found. Click 'Add Product' to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}