import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/types'

const product: Product = {
  id: 7,
  title: 'Test Product',
  price: 29.99,
  description: 'A test product',
  category: 'electronics',
  image: 'http://example.com/img.jpg',
  rating: { rate: 4.5, count: 100 },
}

function renderCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  )
}

it('renders the product title, price, and rating', () => {
  renderCard()
  expect(screen.getByText('Test Product')).toBeInTheDocument()
  expect(screen.getByText('$29.99')).toBeInTheDocument()
  expect(screen.getByText('★ 4.5')).toBeInTheDocument()
})

it('renders the product category', () => {
  renderCard()
  expect(screen.getByText('electronics')).toBeInTheDocument()
})

it('links to the product detail page', () => {
  renderCard()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/products/7')
})
