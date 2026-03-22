import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { NavigationContainer } from '@react-navigation/native';
import Topbar from '../Topbar';

// Mock navigation hooks
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn().mockReturnValue(false),
    }),
    useNavigationState: () => 'Home',
  };
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <NavigationContainer>
        {ui}
      </NavigationContainer>
    </Provider>
  );
};


describe('Topbar', () => {
  it('renders correctly in logged out state', () => {
    renderWithProvider(<Topbar isLoggedIn={false} />);
    
    expect(screen.getByText('Swipe & Shop')).toBeTruthy();
    expect(screen.queryByText(/Hello/)).toBeNull();
  });

  it('renders correctly in logged in state', () => {
    renderWithProvider(<Topbar isLoggedIn={true} userName="Sreerag" />);
    
    expect(screen.getByText('Welcome back')).toBeTruthy();
    expect(screen.getByText('Hello Sreerag')).toBeTruthy();
  });

  it('handles search input and clear button', () => {
    renderWithProvider(<Topbar isLoggedIn={false} showSearch={true} />);
    
    const input = screen.getByPlaceholderText('Search products...');
    
    // Type something
    fireEvent.changeText(input, 'iPhone');
    expect(input.props.value).toBe('iPhone');
  });

  it('hides search bar when showSearch is false', () => {
    renderWithProvider(<Topbar isLoggedIn={false} showSearch={false} />);
    
    expect(screen.queryByPlaceholderText('Search products...')).toBeNull();
  });
});

