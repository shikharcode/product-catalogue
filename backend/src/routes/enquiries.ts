import { Router, Request, Response, NextFunction } from 'express';
import { IEmailService } from '../services/IEmailService';
import { config } from '../config';
import { EnquiryPayload, EnquiryStatus } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createEnquiriesRouter(emailService: IEmailService): Router {
  const router = Router();

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, productTitle, name, email, message } =
        req.body as Partial<EnquiryPayload>;

      if (!productId || !productTitle?.trim() || !name?.trim() || !email?.trim() || !message?.trim()) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
      if (!EMAIL_REGEX.test(email.trim())) {
        res.status(400).json({ error: 'Invalid email address' });
        return;
      }

      await emailService.sendEnquiry(config.salesEmail, {
        productId,
        productTitle: productTitle.trim(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      res.json({ status: EnquiryStatus.Success });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
