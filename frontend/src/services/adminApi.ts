import { Product } from './productsApi';

import { apiUrl } from './apiUrl';

export const bulkUploadProductsExcel = async (
  file: File
): Promise<{ message: string; insertedCount: number; failedCount: number; failures: Array<{ row: number; message: string }> }> => {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(apiUrl('/api/admin/bulk-upload-products'), {
    method: 'POST',
    body: fd,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || 'Failed to bulk upload products');
  }
  return data;
};

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
