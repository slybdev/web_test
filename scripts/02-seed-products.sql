-- Seed initial products data
INSERT INTO products (name, description, price, discount_price, category, stock, rating, review_count, image_url)
VALUES 
  (
    'Seriour Mass',
    'Premium mass-building supplement with advanced amino acid profile. Perfect for those looking to gain quality muscle mass. Contains optimized blend of proteins and carbohydrates.',
    69.99,
    NULL,
    'Mass Gainers',
    100,
    4.5,
    45,
    '/images/product-1.jpg'
  ),
  (
    'Protein Whey',
    'High-quality whey protein isolate for muscle recovery and growth. Fast-absorbing formula with excellent amino acid profile. Ideal post-workout supplement.',
    49.99,
    44.99,
    'Proteins',
    150,
    4.8,
    68,
    '/images/product-2.jpg'
  ),
  (
    'Max Mass 3XL',
    'Ultimate mass gainer formula designed for serious athletes. Packed with calories, proteins, and nutrients to support intensive training. Enhanced with vitamins and minerals.',
    89.99,
    NULL,
    'Mass Gainers',
    75,
    4.6,
    52,
    '/images/product-3.jpg'
  ),
  (
    'Box Full of Muscles',
    'Complete muscle-building stack including multiple supplements. Everything you need for comprehensive muscle development and recovery.',
    129.99,
    119.99,
    'Bundles',
    50,
    4.7,
    38,
    '/images/product-4.jpg'
  ),
  (
    'Protein Powder Premium',
    'Advanced protein formula with added BCAAs and glutamine. Smooth texture and great taste. Supports lean muscle development and recovery.',
    59.99,
    NULL,
    'Proteins',
    120,
    4.4,
    41,
    '/images/product-5.jpg'
  );
