import { useEffect, useState } from 'react';
import { type Product } from '../types';
import { api } from '../api/client';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getFeatured()
      .then(setFeatured)
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-16 text-gray-400">Loading…</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featured.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
