"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    // Prevent double transformations if already applied
    if (url.includes(`/upload/${transformStr}/`)) return url;
    return url.replace('/upload/', `/upload/${transformStr}/`);
  };

  const initialUrl = getImageUrl(product?.images?.[0] || product?.image || product?.imageUrl || null);
  const rawImageSrc = applyCloudinaryTransform(initialUrl, 'f_auto,q_90,w_500');
  const imageSrc = (imgError || rawImageSrc === '/placeholder-product.png') ? '/placeholder.png' : rawImageSrc;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100">
      <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <Image
          src={imageSrc}
          onError={() => setImgError(true)}
          alt={product.name || 'Product'}
          width={400}
          height={300}
          quality={70}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {product.category?.name && (
          <span className="absolute top-4 left-4 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.category.name}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
          {product.shortDescription}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex justify-center items-center w-full px-4 py-2 bg-gray-50 text-brand-green border border-gray-200 rounded-lg hover:bg-brand-green hover:text-white transition-colors font-medium text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}