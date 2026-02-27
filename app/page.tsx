import { getAllProducts, type Product } from '@/app/actions/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Nature Cure - Premium Health Supplements',
  description: 'High-quality health supplements and nutrition products for your wellness journey',
};

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
    console.log('[v0] Loaded products:', products.length);
  } catch (error) {
    console.error('[v0] Error loading products:', error);
  }
  
  // Get or create session ID
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()}`;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Nature Cure</h1>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-foreground hover:text-primary font-medium">
              Shop
            </Link>
            <Link 
              href="/cart" 
              className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to Nature Cure</h2>
          <p className="text-xl text-gray-100 mb-8">
            Premium health supplements and nutrition products for your wellness journey
          </p>
          <Link
            href="/products"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">
              Discover our handpicked selection of premium supplements
            </p>
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.slice(0, 6).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    sessionId={sessionId}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/products"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-secondary transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Products coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Choose Nature Cure?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Premium Quality</h3>
              <p className="text-gray-700">
                All our supplements are sourced from trusted manufacturers and tested for purity and potency.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Best Prices</h3>
              <p className="text-gray-700">
                Enjoy competitive pricing with exclusive discounts on bulk purchases and regular promotions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Expert Support</h3>
              <p className="text-gray-700">
                Our nutrition experts are here to help you choose the right supplements for your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Nature Cure</h3>
              <p className="text-gray-300">
                Your trusted source for premium health supplements and nutrition products.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Nature Cure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
