import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getProducts, getProductsMeta, type Product, type ProductsMeta } from '@/services/productsApi';
import { createProduct, updateProduct, deleteProduct } from '@/services/adminApi';
import AdminHeader from '@/components/AdminHeader';
import { apiUrl } from '@/services/apiUrl';

const AdminDashboard = () => {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ProductsMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '' as Product['category'],
    subcategory: '',
    thickness: '',
    finish: '',
    price: '',
    image: '',
    description: '',
    specs: {} as Record<string, string>,
  });

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    if (!user || user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }
    fetchProducts();
    fetchMeta();
  }, [authLoading, user, navigate]); // Add navigate to dependencies

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getProducts({ page, limit: 10 });
      setProducts(res.products);
      setTotalPages(res.totalPages);
      setCurrentPage(page);
    } catch (err) {
      toast({ title: 'Failed to fetch products', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const data = await getProductsMeta();
      setMeta(data);
    } catch (err) {
      toast({ title: 'Failed to fetch metadata', variant: 'destructive' });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      const res = await fetch(apiUrl('/api/admin/upload-image'), {
        method: 'POST',
        body: uploadFormData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
      toast({ title: 'Image uploaded successfully' });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast({ title: 'Product updated' });
      } else {
        await createProduct(productData);
        toast({ title: 'Product created' });
      }
      setIsAddDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts(1); // Fetch first page to show new product at top
    } catch (err: any) {
      toast({ title: 'Operation failed', description: err.message, variant: 'destructive' });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      thickness: product.thickness || '',
      finish: product.finish || '',
      price: String(product.price),
      image: product.image,
      description: product.description,
      specs: product.specs,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast({ title: 'Product deleted' });
      fetchProducts(currentPage);
    } catch (err: any) {
      toast({ title: 'Failed to delete', description: err.message, variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '' as Product['category'],
      subcategory: '',
      thickness: '',
      finish: '',
      price: '',
      image: '',
      description: '',
      specs: {},
    });
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white font-poppins flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <AdminHeader />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-playfair font-bold text-gray-900">Admin Dashboard</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) {
                setEditingProduct(null);
                resetForm();
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {meta?.categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input id="subcategory" value={formData.subcategory} onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="thickness">Thickness</Label>
                      <Input id="thickness" value={formData.thickness} onChange={(e) => setFormData({ ...formData, thickness: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="finish">Finish</Label>
                      <Input id="finish" value={formData.finish} onChange={(e) => setFormData({ ...formData, finish: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <div className="space-y-2">
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Or enter image URL"
                      />
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          id="imageFile"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('imageFile')?.click()}
                          disabled={uploadingImage}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingProduct ? 'Update' : 'Create'}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.subcategory}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchProducts(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchProducts(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
