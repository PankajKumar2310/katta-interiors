import { apiUrl } from './apiUrl';

export type Product = {
  id: string;
  name: string;
  category: 'Sunmica' | 'Panels';
  subcategory: string;
  thickness?: string;
  finish?: string;
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  isFeatured?: boolean;
};

export type ProductsListResponse = {
  products: Product[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

export type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string[];
  subcategory?: string[];
  thickness?: string[];
  finish?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  ids?: string[];
  excludeId?: string;
};

const buildQuery = (params: GetProductsParams) => {
  const sp = new URLSearchParams();

  if (params.page) sp.set('page', String(params.page));
  if (params.limit) sp.set('limit', String(params.limit));

  params.category?.forEach((c) => sp.append('category', c));
  params.subcategory?.forEach((s) => sp.append('subcategory', s));
  params.thickness?.forEach((t) => sp.append('thickness', t));
  params.finish?.forEach((f) => sp.append('finish', f));

  if (params.minPrice !== undefined) sp.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) sp.set('maxPrice', String(params.maxPrice));

  if (params.search) sp.set('search', params.search);
  if (params.featured) sp.set('featured', 'true');

  if (params.ids && params.ids.length > 0) {
    sp.set('ids', params.ids.join(','));
  }

  if (params.excludeId) {
    sp.set('excludeId', params.excludeId);
  }

  const query = sp.toString();
  return query ? `?${query}` : '';
};

export const getProducts = async (params: GetProductsParams = {}): Promise<ProductsListResponse> => {
  const url = apiUrl(`/api/products${buildQuery(params)}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(apiUrl(`/api/products/${id}`));
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export type ProductsMeta = {
  categories: Array<{ name: string; subcategories: string[] }>;
  thicknesses: string[];
  finishes: string[];
  price: { min: number; max: number };
};

export const getProductsMeta = async (): Promise<ProductsMeta> => {
  const res = await fetch(apiUrl('/api/products/meta'));
  if (!res.ok) throw new Error('Failed to fetch products meta');
  const data = await res.json();
  return data;
};
