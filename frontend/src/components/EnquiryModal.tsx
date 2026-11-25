import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { type Product, type EnquiryFormValues } from '@/types';
import { EnquiryStatus, SubmitState } from '@/enums';
import { api } from '@/api/client';

interface Props {
  product: Product;
  onClose: () => void;
}

export function EnquiryModal({ product, onClose }: Props) {
  const [form, setForm] = useState<EnquiryFormValues>({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState<SubmitState>(SubmitState.Idle);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState(SubmitState.Submitting);
    try {
      const res = await api.submitEnquiry({
        productId: product.id,
        productTitle: product.title,
        ...form,
      });
      if (res.status === EnquiryStatus.Success) {
        setSubmitState(SubmitState.Success);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
        setSubmitState(SubmitState.Error);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setErrorMsg(msg);
      setSubmitState(SubmitState.Error);
    }
  };

  const field = (key: keyof EnquiryFormValues) => ({
    id: key,
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {submitState === SubmitState.Success ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>
            <DialogHeader className="items-center">
              <DialogTitle>Thank you!</DialogTitle>
              <DialogDescription>We&apos;ll be in touch shortly.</DialogDescription>
            </DialogHeader>
            <Button className="mt-6" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Enquire about this product</DialogTitle>
              <DialogDescription className="truncate">{product.title}</DialogDescription>
            </DialogHeader>

            <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input placeholder="Your name" required {...field('name')} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="you@example.com" required {...field('email')} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  placeholder="Your message…"
                  required
                  rows={4}
                  className="resize-none"
                  {...field('message')}
                />
              </div>

              {submitState === SubmitState.Error && (
                <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitState === SubmitState.Submitting}
                className="w-full"
              >
                {submitState === SubmitState.Submitting ? 'Sending…' : 'Send Enquiry'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
