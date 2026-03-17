'use client';
import { useState, useEffect } from 'react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      } else {
        console.error('Failed to fetch enquiries');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) fetchEnquiries();
      
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`http://localhost:5000/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enquiries Inbox</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 font-semibold text-gray-700">Date</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Customer Details</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Message / Product</th>
              <th className="py-4 px-6 font-semibold text-gray-700 text-center">Status</th>
              <th className="py-4 px-6 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map(enq => (
                <tr key={enq._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{enq.name}</p>
                    <p className="text-sm text-gray-500">{enq.email}</p>
                    <p className="text-sm text-gray-500">{enq.phone}</p>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    {enq.productId && (
                      <p className="text-xs font-bold text-brand-green mb-1">
                        Product: {enq.productId.name}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 truncate">{enq.message}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span 
                      onClick={() => updateStatus(enq._id, enq.status)}
                      className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold ${
                        enq.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {enq.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button onClick={() => deleteEnquiry(enq._id)} className="text-red-600 hover:underline text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No enquiries found in the inbox.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
