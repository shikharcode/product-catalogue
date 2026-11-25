import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EnquiryModal } from '@/components/EnquiryModal';
import { EnquiryStatus, type Product } from '@/types';
import { api } from '@/api/client';

vi.mock('@/api/client', () => ({
  api: { submitEnquiry: vi.fn() },
}));

const product: Product = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  description: '',
  category: 'electronics',
  image: '',
  rating: { rate: 4, count: 10 },
};

function fillAndSubmit() {
  fireEvent.change(screen.getByPlaceholderText('Your name'), {
    target: { value: 'Jane Smith' },
  });
  fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Your message…'), {
    target: { value: 'Is this in stock?' },
  });
  fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }));
}

it('shows the thank you message after a successful submission', async () => {
  vi.mocked(api.submitEnquiry).mockResolvedValueOnce({ status: EnquiryStatus.Success });
  render(<EnquiryModal product={product} onClose={vi.fn()} />);

  fillAndSubmit();

  await waitFor(() => expect(screen.getByText(/thank you/i)).toBeInTheDocument());
});

it('shows an error message when submission fails', async () => {
  vi.mocked(api.submitEnquiry).mockRejectedValueOnce(new Error('Server error'));
  render(<EnquiryModal product={product} onClose={vi.fn()} />);

  fillAndSubmit();

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Server error'));
});
