import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Product } from '../types';
import { api } from '../api/client';
import { EnquiryModal } from '../components/EnquiryModal';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .getProduct(Number(id))
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-16 text-muted-foreground">Loading…</p>;
  if (!product) return <p className="text-center py-16 text-muted-foreground">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={product.image}
              alt={product.title}
              className="h-56 object-contain md:w-48 self-center shrink-0"
            />
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-xl font-bold text-card-foreground mb-3">{product.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-card-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  ★ {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {product.description}
              </p>
              <Button onClick={() => setShowEnquiry(true)}>
                Enquire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showEnquiry && (
        <EnquiryModal product={product} onClose={() => setShowEnquiry(false)} />
      )}
    </div>
  );
}
