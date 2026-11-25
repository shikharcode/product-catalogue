import nodemailer from 'nodemailer';
import { EnquiryPayload, SmtpConfig } from '../types';
import { IEmailService } from './IEmailService';

export class NodemailerEmailService implements IEmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(smtp: SmtpConfig) {
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    });
  }

  async sendEnquiry(to: string, payload: EnquiryPayload): Promise<void> {
    await this.transporter.sendMail({
      from: payload.email,
      to,
      subject: `Product Enquiry: ${payload.productTitle}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Product: ${payload.productTitle} (ID: ${payload.productId})`,
        '',
        payload.message,
      ].join('\n'),
    });
  }
}
