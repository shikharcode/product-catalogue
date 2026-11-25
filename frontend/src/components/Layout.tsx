import { useState, useEffect, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '../api/client';

export function Layout({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-primary shrink-0">
              Catalogue
            </Link>
            <form onSubmit={handleSearch} role="search" className="flex flex-1 max-w-md gap-2">
              <Input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="flex-1"
              />
              <Button type="submit" variant="default">
                Search
              </Button>
            </form>
          </div>
          <nav className="mt-3 flex gap-5 flex-wrap">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
