import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

const mockProduct = {
  image: 1, // mock image asset id
  category: 'ELECTRONICS',
  name: 'Test Product',
  price: 99.99,
  rating: 4.5,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ProductCard
        image={mockProduct.image}
        category={mockProduct.category}
        name={mockProduct.name}
        price={mockProduct.price}
        rating={mockProduct.rating}
      />
    );

    expect(screen.getByText('ELECTRONICS')).toBeTruthy();
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('$99.99')).toBeTruthy();
    expect(screen.getByText('4.5')).toBeTruthy();
  });


});
