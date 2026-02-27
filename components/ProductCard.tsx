'use client';

import Link from 'next/link';
import { Product } from '@/lib/supabase';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { addToCart } from '@/app/actions/cart';

interface ProductCardProps {
  product: Product;
  sessionId: string;
}

export default function ProductCard({ product, sessionId }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(sessionId, product.id, 1);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const originalPrice = product.price;
  const discountedPrice = product.discount_price;
  const discountPercent = discountedPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden group">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=' + encodeURIComponent(product.name);
          }}
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.review_count})</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {discountedPrice ? (
            <>
              <span className="text-2xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-primary">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-secondary text-white py-2 px-3 rounded-lg text-center text-sm font-medium hover:bg-primary transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${
              showAdded
                ? 'bg-green-500 text-white'
                : 'bg-accent text-white hover:bg-yellow-600'
            }`}
          >
            <ShoppingCart size={18} />
            {showAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
