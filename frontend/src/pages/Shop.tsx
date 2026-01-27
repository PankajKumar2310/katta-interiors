import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ShopFilters from '@/components/ShopFilters';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { getProducts, getProductsMeta, type Product, type ProductsMeta } from '@/services/productsApi';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<ProductsMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(() => Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    category: [],
    thickness: [],
    finish: [],
    price: [0, 1000],
  });

  const [appliedFilters, setAppliedFilters] = useState({
    category: [],
    thickness: [],
    finish: [],
    price: [0, 1000],
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getProductsMeta();
        if (!mounted) return;
        setMeta(data);
        const initialPrice = [data.price.min, data.price.max];
        setFilters({
          category: [],
          thickness: [],
          finish: [],
          price: initialPrice,
        });
        setAppliedFilters({
          category: [],
          thickness: [],
          finish: [],
          price: initialPrice,
        });
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!meta) return;

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await getProducts({
          page,
          limit: 12,
          category: appliedFilters.category?.length ? appliedFilters.category : undefined,
          thickness: appliedFilters.thickness?.length ? appliedFilters.thickness : undefined,
          finish: appliedFilters.finish?.length ? appliedFilters.finish : undefined,
          minPrice: appliedFilters.price?.[0],
          maxPrice: appliedFilters.price?.[1],
        });

        if (!mounted) return;

        setProducts(res.products);
        setTotalPages(res.totalPages);
        setTotalCount(res.totalCount);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setProducts([]);
        setTotalPages(1);
        setTotalCount(0);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [meta, JSON.stringify(appliedFilters), page]);

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
  }, []);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setPage(1);
  }, [filters]);

  const handleGoToPage = useCallback((nextPage: number) => {
    const safe = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safe);
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-playfair font-bold text-gray-900">Filters</h2>
            {meta && (
              <ShopFilters
                categories={meta.categories}
                thicknesses={meta.thicknesses}
                finishes={meta.finishes}
                priceRange={meta.price}
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            )}
            <Button onClick={applyFilters} className="w-full mt-4">
              Apply Filters
            </Button>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-gray-900">Shop</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-600 hidden sm:block">{totalCount} products</p>
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Filters</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6">
                        {meta && (
                          <ShopFilters
                            categories={meta.categories}
                            thicknesses={meta.thicknesses}
                            finishes={meta.finishes}
                            priceRange={meta.price}
                            onFilterChange={handleFilterChange}
                            initialFilters={filters}
                          />
                        )}
                        <Button onClick={applyFilters} className="w-full">
                          Apply Filters
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={isInWishlist(product.id)}
                  onWishlistToggle={toggleWishlist}
                />
              ))}
            </div>
            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            )}

            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGoToPage(page - 1);
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === page}
                        onClick={(e) => {
                          e.preventDefault();
                          handleGoToPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGoToPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="text-center text-sm text-gray-500 mt-3">
                {totalCount} products
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;