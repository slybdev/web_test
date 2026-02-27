'use client';

import { useState, useEffect } from 'react';
import { Product, Review } from '@/lib/supabase';
import { getProductById, getReviewsByProductId, addReview } from '@/app/actions/products';
import { addToCart } from '@/app/actions/cart';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = parseInt(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // Review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // Get or create session ID
    const sid = `session_${Date.now()}_${Math.random()}`;
    setSessionId(sid);

    // Fetch product and reviews
    const fetchData = async () => {
      try {
        const [productData, reviewsData] = await Promise.all([
          getProductById(productId),
          getReviewsByProductId(productId),
        ]);
        setProduct(productData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!sessionId) return;
    setIsAddingToCart(true);
    try {
      await addToCart(sessionId, productId, quantity);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    try {
      const newReview = await addReview(productId, reviewRating, reviewComment, reviewName || 'Anonymous');
      if (newReview) {
        setReviews([newReview, ...reviews]);
        setReviewRating(5);
        setReviewComment('');
        setReviewName('');
        setShowReviewForm(false);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Product not found</p>
        <Link href="/products" className="text-primary hover:text-secondary">
          Back to products
        </Link>
      </div>
    );
  }

  const originalPrice = product.price;
  const discountedPrice = product.discount_price;
  const discountPercent = discountedPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-6">
        <div className="container mx-auto px-4">
          <Link href="/products" className="flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </header>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="relative bg-gray-100 aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500?text=' + encodeURIComponent(product.name);
                }}
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-bold text-lg">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {product.rating} ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {discountedPrice ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-primary">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-l border-r border-gray-300 py-2"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className="flex-1 bg-accent text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>

              {/* Category */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="font-semibold">Category:</span> {product.category}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="max-w-4xl border-t pt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Customer Reviews</h2>

            {/* Review Form */}
            {!showReviewForm ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="mb-8 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                Write a Review
              </button>
            ) : (
              <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          size={28}
                          className={star <= reviewRating ? 'fill-accent text-accent' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors disabled:opacity-50"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.user_id || 'Anonymous'}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
