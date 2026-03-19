'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const { submitEnquiry } = await import('@/services/api');
      await submitEnquiry(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch for bulk orders, dealership inquiries, or product support.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Corporate Office</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-brand-green text-xl mr-4">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Corporate Office</p>
                      <p className="text-gray-600">Maalavya Enterprises<br/>Vasundhara Sector 5, Ghaziabad<br/>Uttar Pradesh, India</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green text-xl mr-4">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Sales Office</p>
                      <p className="text-gray-600">Maalavya Enterprises<br/>Ashiyana Colony, Moradabad<br/>Uttar Pradesh, India – 244001</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green text-xl mr-4">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">
                        Inquiry: <a href="tel:+917827791329" className="hover:text-brand-green hover:underline">+91-7827791329</a><br/>
                        Sales: <a href="tel:+919971625110" className="hover:text-brand-green hover:underline">+91-9971625110</a>, <a href="tel:+917348077130" className="hover:text-brand-green hover:underline">+91-7348077130</a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-green text-xl mr-4">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">
                        <a href="mailto:sales.maalavya@gmail.com" className="hover:text-brand-green hover:underline">sales.maalavya@gmail.com</a><br/>
                        <a href="mailto:contact.maalavaya@gmail.com" className="hover:text-brand-green hover:underline">contact.maalavaya@gmail.com</a>
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <a href="https://wa.me/917827791329" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-brand-green hover:bg-brand-green-dark text-white py-3 rounded-lg font-bold transition-colors shadow-md">
                    <span>💬</span>
                    <span className="ml-2">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Fake Google Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-64 border border-gray-300 flex items-center justify-center">
                 <p className="text-gray-500 font-semibold text-lg hover:text-gray-700 cursor-pointer">[ Interactive Google Map Embed Placed Here ]</p>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send an Enquiry</h3>
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  Thank you! Your enquiry has been submitted. Our sales team will contact you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                  Failed to submit enquiry. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-shadow"
                      placeholder="john@hospital.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-shadow"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Requirements / Message *</label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none transition-shadow"
                    placeholder="Please quote for 50x Hospital Beds Model A..."
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting...' : 'Send Enquiry'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
