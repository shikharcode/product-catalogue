import { Router, Request, Response, NextFunction } from 'express';
import { IProductService } from '../services/IProductService';
import { Product } from '../types';
import { SortDirection } from '../enums';

const TOP_RATED_COUNT = 3;

function sortByRating(products: Product[], dir: SortDirection): Product[] {
  return [...products].sort((a, b) =>
    dir === SortDirection.Desc ? b.rating.rate - a.rating.rate : a.rating.rate - b.rating.rate
  );
}

export function createCategoriesRouter(productService: IProductService): Router {
  const router = Router();

  router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await productService.getCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:category', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category } = req.params;
      const products = await productService.getByCategory(category);
      const sorted = sortByRating(products, SortDirection.Desc);
      res.json({
        category,
        featured: sorted.slice(0, TOP_RATED_COUNT),
        additional: sorted.slice(TOP_RATED_COUNT),
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
