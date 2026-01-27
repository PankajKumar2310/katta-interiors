import { Product } from './productsApi';

import { apiUrl } from './apiUrl';

export const createProduct = async (productData: Partial<Product>): Promise<{ message: string; product: Product }> => {
  const res = await fetch(apiUrl('/api/products'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create product');
  }
  return res.json();
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<{ message: string; product: Product }> => {
  const res = await fetch(apiUrl(`/api/products/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update product');
  }
  return res.json();
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await fetch(apiUrl(`/api/products/${id}`), {
    method: 'DELETE',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete product');
  }
  return res.json();
};
