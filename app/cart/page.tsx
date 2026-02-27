'use client';

import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/supabase';
import { getCartItems, updateCartItem, removeFromCart, clearCart } from '@/app/actions/cart';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Get or create session ID
    const sid = `session_${Date.now()}_${Math.random()}`;
    setSessionId(sid);

    // Fetch cart items
    const fetchCart = async () => {
      try {
        const items = await getCartItems(sid);
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    setIsUpdating(true);
    try {
      await updateCartItem(cartItemId, newQuantity);
      if (newQuantity <= 0) {
        setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    setIsUpdating(true);
    try {
      await removeFromCart(cartItemId);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    setIsUpdating(true);
    try {
      await clearCart(sessionId);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product;
    const price = product?.discount_price || product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading cart...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
      </header>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = item.product;
                    if (!product) return null;

                    const price = product.discount_price || product.price;
                    const itemTotal = price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 flex gap-6"
                      >
                        {/* Product Image */}
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=' + encodeURIComponent(product.name);
                            }}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <Link
                              href={`/products/${product.id}`}
                              className="text-lg font-semibold text-foreground hover:text-primary"
                            >
                              {product.name}
                            </Link>
                            <p className="text-gray-600 text-sm mt-1">
                              {product.category}
                            </p>
                          </div>

                          {/* Price Info */}
                          <div className="flex items-center gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-600">Price per unit</p>
                              <p className="text-lg font-semibold text-primary">
                                ${price.toFixed(2)}
                              </p>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={isUpdating}
                                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(
                                    item.id,
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-12 text-center border-l border-r border-gray-300 py-2"
                                min="1"
                                disabled={isUpdating}
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.id, item.quantity + 1)
                                }
                                disabled={isUpdating}
                                className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>

                            {/* Total */}
                            <div>
                              <p className="text-sm text-gray-600">Total</p>
                              <p className="text-lg font-semibold text-primary">
                                ${itemTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating}
                          className="text-red-600 hover:text-red-700 disabled:opacity-50 flex-shrink-0"
                          title="Remove from cart"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    disabled={isUpdating}
                    className="mt-6 text-red-600 hover:text-red-700 font-semibold disabled:opacity-50"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-lg font-bold text-foreground">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors mb-3">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/products"
                    className="block w-full text-center border border-gray-300 py-3 rounded-lg font-semibold text-foreground hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                Browse Products
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
