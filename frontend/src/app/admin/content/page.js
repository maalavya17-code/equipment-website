'use client';
import { useState, useEffect } from 'react';

export default function AdminContent() {
  const [content, setContent] = useState({
    aboutText: '',
    contactDetails: {
      address: '',
      phone: '',
      email: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sitecontents');
      if (res.ok) {
        const data = await res.json();
        setContent({
          aboutText: data.aboutText || '',
          contactDetails: {
            address: data.contactDetails?.address || '',
            phone: data.contactDetails?.phone || '',
            email: data.contactDetails?.email || ''
          }
        });
      }
    } catch (err) {
      console.error('Failed to fetch site content');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/sitecontents', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        alert('Site content updated securely!');
      } else {
        alert('Failed to update content.');
      }
    } catch (err) {
      alert('Error saving data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading content preferences...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Site Content</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company About Text</label>
            <textarea
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
              value={content.aboutText}
              onChange={(e) => setContent({...content, aboutText: e.target.value})}
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 border-b pb-2">Public Contact Details</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
              value={content.contactDetails.address}
              onChange={(e) => setContent({...content, contactDetails: {...content.contactDetails, address: e.target.value}})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                value={content.contactDetails.phone}
                onChange={(e) => setContent({...content, contactDetails: {...content.contactDetails, phone: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Corporate Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
                value={content.contactDetails.email}
                onChange={(e) => setContent({...content, contactDetails: {...content.contactDetails, email: e.target.value}})}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Publish Content'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
