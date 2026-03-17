'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

export default function EditProduct({ params }) {
  const router = useRouter();
  // Unwrap params using React 19 / Next.js 15 'use' syntax
  const { id } = use(params);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchProductDetails();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (res.ok) {
        const prod = await res.json();
        setFormData({
          name: prod.name || '',
          category: prod.category?._id || '',
          description: prod.fullDescription || prod.shortDescription || '',
          price: prod.price || '',
        });
        if (prod.images && prod.images.length > 0) {
          setCurrentImage(prod.images[0]);
        }
      }
    } catch (err) {
      console.error('Failed to fetch product details', err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      let imagePaths = currentImage ? [currentImage] : [];

      // 1. Upload new image if provided
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);

        const uploadRes = await fetch('http://localhost:5000/api/upload/image', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: imgData,
        });
        const uploadData = await uploadRes.json();
        if (uploadRes.ok) {
          imagePaths = uploadData.filePaths;
        }
      }

      // 2. Update Product
      const payload = {
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: formData.category,
        shortDescription: formData.description.substring(0, 150),
        fullDescription: formData.description,
        price: Number(formData.price) || 0,
        images: imagePaths,
      };

      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-gray-500">Loading product data...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products" className="text-gray-500 hover:text-blue-600">← Back</Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            {currentImage && !imageFile && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                <img src={currentImage} alt="Current" className="h-32 object-contain bg-gray-50 border rounded p-2" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the existing one.</p>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
