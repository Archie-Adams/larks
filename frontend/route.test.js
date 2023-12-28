import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Routes from './src/Routes';
import { AuthTokenContext } from './src/App';

const mockContextValue = {
  token: 'mock-token', 
};

describe('Route tests', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<Router>{ui}</Router>);
  };

  // Tests for unauthenticated routes
  test('navigating to the sign-in page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={{ token: null }}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/auth/signin' }
    );
    expect(screen.getByText('Sign In Component Content')).toBeInTheDocument();
  });

  test('navigating to the sign-up page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={{ token: null }}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/auth/signup' }
    );
    expect(screen.getByText('Sign Up Component Content')).toBeInTheDocument();
  });

  // Tests for authenticated routes
  test('landing on the home page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/home' }
    );
    expect(screen.getByText('Home Component Content')).toBeInTheDocument();
  });

  test('navigating to the Paralysis Analysis page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/paralysis-analysis' }
    );
    expect(screen.getByText('Paralysis Analysis Component Content')).toBeInTheDocument();
  });

  // Tests for nested routes - example with Skin Scan
  test('navigating to Skin Scan main page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/skin-scan' }
    );
    expect(screen.getByText('Skin Scan Component Content')).toBeInTheDocument();
  });

  test('navigating to Skin Scan take photo page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/skin-scan/take_photo' }
    );
    expect(screen.getByText('Take Photo Component Content')).toBeInTheDocument();
  });

  // Tests for TonsillitisDetector routes
  test('navigating to Tonsillitis Detector main page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/shreyas/shreyas' }
    );
    expect(screen.getByText('Tonsillitis Detector Component Content')).toBeInTheDocument();
  });
  
  test('navigating to Tonsillitis Photo Instructions page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/shreyas/tonsillitis_instructions' }
    );
    expect(screen.getByText('Tons Photo Instructions Component Content')).toBeInTheDocument();
  });
  
  // Tests for Dipstik routes
  test('navigating to Dipstik Instructions page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/dipstik' }
    );
    expect(screen.getByText('Dipstik Instructions Component Content')).toBeInTheDocument();
  });
  
  test('navigating to Dipstik Camera page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/dipstik/dipstik-camera' }
    );
    expect(screen.getByText('Dipstik Camera Component Content')).toBeInTheDocument();
  });
  
  // Test for RootsRadar route
  test('navigating to Roots Radar page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/roots-radar' }
    );
    expect(screen.getByText('Roots Radar Component Content')).toBeInTheDocument();
  });
  
  // Tests for EaseMind routes
  test('navigating to EaseMind main page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/EaseMind' }
    );
    expect(screen.getByText('EaseMind Component Content')).toBeInTheDocument();
  });
  
  test('navigating to EaseMind Personal Details page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/EaseMind_personal_details' }
    );
    expect(screen.getByText('EaseMind Personal Details Component Content')).toBeInTheDocument();
  });

    // Tests for AutismDetector routes
  test('navigating to Autism Detector main page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/autism_instructions' }
    );
    expect(screen.getByText('Autism Detector Component Content')).toBeInTheDocument();
  });
  
  test('navigating to Autism Detector Personal Details page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/autism_instructions/personaldetails' }
    );
    expect(screen.getByText('Autism Detector Personal Details Component Content')).toBeInTheDocument();
  });
  
  // Test for DepressiLess route
  test('navigating to DepressiLess main page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/DepressiLess' }
    );
    expect(screen.getByText('DepressiLess Component Content')).toBeInTheDocument();
  });

  // Test for the 404 Page Not Found route
  test('navigating to a non-existent page shows 404 page', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/non-existent-path' }
    );
    expect(screen.getByText('Page Not Found Component Content')).toBeInTheDocument();
  });

  // Test redirection when an invalid route is accessed
  test('redirecting to home when accessing an invalid route', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/invalid-route' }
    );
    expect(screen.getByText('Home Component Content')).toBeInTheDocument(); // Assuming redirection to home
  });
  
  // Test redirection for unauthenticated access to a protected route
  test('redirecting to sign-in page when accessing a protected route unauthenticated', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={{ token: null }}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/home' }
    );
    expect(screen.getByText('Sign In Component Content')).toBeInTheDocument();
  });
  
  // Test handling of route with invalid parameters
  test('handling invalid parameters in a route', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/some-route/invalid-param' }
    );
    expect(screen.getByText('Error or Redirect Message')).toBeInTheDocument();
  });
  
  // Test nested route access and behavior
  test('navigating to a nested route', () => {
    renderWithRouter(
      <AuthTokenContext.Provider value={mockContextValue}>
        <Routes />
      </AuthTokenContext.Provider>,
      { route: '/parent-route/nested-route' }
    );
    expect(screen.getByText('Nested Route Component Content')).toBeInTheDocument();
  });
  
});
