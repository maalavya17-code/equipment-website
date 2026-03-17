import Link from 'next/link';

export default function ProductCard({ product }) {
  console.log("Product Image:", product.images);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100">
      <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-4">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : 'https://via.placeholder.com/300x200'
          }
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
        </Link>
      </div>
    </div>
  );
}