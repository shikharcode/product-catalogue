import { Router, Request, Response, NextFunction } from 'express';
import { IProductService } from '../services/IProductService';
import { config } from '../config';

export function createProductsRouter(productService: IProductService): Router {
  const router = Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query;
      const products =
        typeof q === 'string' && q.trim()
          ? await productService.search(q.trim())
          : await productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  router.get('/featured', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getByIds(config.featuredProductIds);
      res.json(products);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({ error: 'Invalid product ID' });
        return;
      }
      const product = await productService.getById(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
