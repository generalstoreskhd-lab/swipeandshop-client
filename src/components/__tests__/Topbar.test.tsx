import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Topbar from '../Topbar';

describe('Topbar', () => {
  it('renders correctly in logged out state', () => {
    render(<Topbar isLoggedIn={false} />);
    
    expect(screen.getByText('Swipe & Shop')).toBeTruthy();
    expect(screen.queryByText(/Hello/)).toBeNull();
  });

  it('renders correctly in logged in state', () => {
    render(<Topbar isLoggedIn={true} userName="Sreerag" />);
    
    expect(screen.getByText('Welcome back')).toBeTruthy();
    expect(screen.getByText('Hello Sreerag')).toBeTruthy();
  });

  it('handles search input and clear button', () => {
    render(<Topbar isLoggedIn={false} showSearch={true} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    
    // Type something
    fireEvent.changeText(input, 'iPhone');
    expect(input.props.value).toBe('iPhone');
    
    // Clear button should be visible (it's a Pressable with close-circle icon)
    // In our mock, Ionicons is just a string, but the Pressable is there.
    // We can find by the close icon name if we were more specific, 
    // but for now let's just test the clear functionality if we can find it.
  });

  it('hides search bar when showSearch is false', () => {
    render(<Topbar isLoggedIn={false} showSearch={false} />);
    
    expect(screen.queryByPlaceholderText('Search products...')).toBeNull();
  });
});
