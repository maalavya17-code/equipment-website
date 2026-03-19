"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return '/placeholder.png'; 
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
    return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  };

  const applyCloudinaryTransform = (url, transformStr) => {
    if (!url || !url.includes('cloudinary.com') || !url.includes('/upload/')) return url;
    if (url.includes(`/upload/${transformStr}/`)) return url;
    return url.replace('/upload/', `/upload/${transformStr}/`);
  };

  const initialUrl = getImageUrl(product?.images?.[0] || product?.image || product?.imageUrl || null);
  // Compress to 100-200kb max by adjusting size and format to webp
  const rawImageSrc = applyCloudinaryTransform(initialUrl, 'c_fill,h_400,w_500,q_auto,f_webp');
  const imageSrc = (imgError || rawImageSrc === '/placeholder-product.png') ? '/placeholder.png' : rawImageSrc;

  const hasMultipleColors = product?.features?.some(f => f.toLowerCase().includes('color')) 
    || product?.specifications?.some(s => s.key?.toLowerCase().includes('color') || s.value?.toLowerCase().includes('color'));

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100 h-full">
      <div className="relative w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          onError={() => setImgError(true)}
          alt={product.name || 'Product'}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {product.category && (
          <span className="absolute top-3 left-3 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
            {typeof product.category === 'string' ? product.category : product.category.name}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug font-sans">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {product.shortDescription}
        </p>

        {hasMultipleColors && (
          <div className="mb-4 text-xs font-semibold text-brand-green flex items-center">
            <span className="w-2 h-2 rounded-full bg-brand-green mr-2"></span>
            Available in multiple colors
          </div>
        )}

        <div className="mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="flex w-full justify-center items-center px-4 py-2.5 bg-gray-50 text-brand-green border border-gray-200 rounded-lg hover:bg-brand-green hover:text-white transition-colors font-semibold text-center mt-2 mx-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}