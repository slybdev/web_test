import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  image_url: string;
  category: string;
  stock: number;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: number;
  product_id: number;
  user_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  product?: Product;
  created_at: string;
  updated_at: string;
};
