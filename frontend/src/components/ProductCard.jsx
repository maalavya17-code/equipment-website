import Link from 'next/link';

export default function ProductCard({ product }) {
  const defaultImage = product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100">
      <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-4">
        {/* We use standard img here for simplicity over Next.js Image if we don't have remote patterns setup */}
        <img
          src={defaultImage}
          alt={product.name}
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
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
          className="inline-flex justify-center items-center w-full px-4 py-2 bg-gray-50 text-brand-blue border border-gray-200 rounded-lg hover:bg-brand-blue hover:text-white transition-colors font-medium"
        >
          View Details
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
