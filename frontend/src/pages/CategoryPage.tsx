import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type CategoryResult } from '@/types';
import { api } from '@/api/client';
import { ProductCard } from '@/components/ProductCard';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState<CategoryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setError('');
    setData(null);
    api
      .getCategoryProducts(category)
      .then(setData)
      .catch(() => setError('Failed to load category.'))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p className="text-center py-16 text-gray-400">Loading…</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;
  if (!data) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{category}</h1>

      {data.featured.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Rated</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {data.additional.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">More Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.additional.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
