import { Link } from 'react-router-dom';
import { type Product } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block h-full">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full object-contain p-4"
        />
        <CardContent className="pb-4">
          <Badge variant="secondary" className="mb-2 capitalize">
            {product.category}
          </Badge>
          <h3 className="mb-3 line-clamp-2 text-sm font-medium text-card-foreground">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-card-foreground">${product.price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">★ {product.rating.rate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
