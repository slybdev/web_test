import { getAllProducts } from '@/app/actions/products';
import ProductCard from '@/components/ProductCard';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata = {
  title: 'Our Products - Nature Cure',
  description: 'Browse our full range of premium health supplements',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  
  // Get or create session ID
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('sessionId')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()}`;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold mb-4 block">
            Nature Cure
          </Link>
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-lg text-gray-100">
            Explore our complete range of premium health supplements
          </p>
        </div>
      </header>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  sessionId={sessionId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products available</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
