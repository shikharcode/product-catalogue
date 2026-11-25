import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Product } from '@/types';
import { api } from '@/api/client';
import { ProductCard } from '@/components/ProductCard';

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) return;
    setLoading(true);
    api
      .searchProducts(q.trim())
      .then(setResults)
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  if (!q.trim()) {
    return <p className="text-center py-16 text-gray-400">Enter a search term above.</p>;
  }
  if (loading) return <p className="text-center py-16 text-gray-400">Searching…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
      </h1>
      {results.length === 0 ? (
        <p className="text-gray-500">No products matched your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
