import { EnquiryPayload } from '../types';

/**
 * Strategy Pattern: email sending contract.
 * Current impl: NodemailerEmailService (MailHog). Swap for SES, SendGrid, etc.
 */
export interface IEmailService {
  sendEnquiry(to: string, payload: EnquiryPayload): Promise<void>;
}
