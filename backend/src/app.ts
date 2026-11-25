import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { IProductService } from './services/IProductService';
import { IEmailService } from './services/IEmailService';
import { createProductsRouter } from './routes/products';
import { createCategoriesRouter } from './routes/categories';
import { createEnquiriesRouter } from './routes/enquiries';
import { config } from './config';

export function createApp(
  productService: IProductService,
  emailService: IEmailService
): express.Application {
  const app = express();

  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());

  app.use('/api/products', createProductsRouter(productService));
  app.use('/api/categories', createCategoriesRouter(productService));
  app.use('/api/enquiries', createEnquiriesRouter(emailService));

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  // 4-arg signature required for Express to treat this as an error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
