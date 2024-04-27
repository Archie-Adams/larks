import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { AuthTokenContext } from '../../App';

describe('Header', () => {
  it('renders header with title and buttons', () => {
    // Mock the context values
    const contextValues = {
      token: 'your_mocked_token',
      setToken: jest.fn(),
      email: 'your_mocked_email',
      setEmail: jest.fn(),
      rootsRadarRole: '0',
      setRootsRadarRole: jest.fn(),
      id: 'your_mocked_id',
      setId: jest.fn(),
    };

    render(
      <AuthTokenContext.Provider value={contextValues}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthTokenContext.Provider>,
    );

    // Assertions for the rendered header
    expect(screen.getByText('LARKS APP')).toBeInTheDocument();
    expect(screen.getByText('Apps')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('clicking on logout button calls setToken', () => {
    const contextValues = {
      token: 'your_mocked_token',
      setToken: jest.fn(),
      email: 'your_mocked_email',
      setEmail: jest.fn(),
      rootsRadarRole: '0',
      setRootsRadarRole: jest.fn(),
      id: 'your_mocked_id',
      setId: jest.fn(),
    };

    render(
      <AuthTokenContext.Provider value={contextValues}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthTokenContext.Provider>,
    );

    // Click on the logout button and assert that setToken is called
    fireEvent.click(screen.getByText('Logout'));
    expect(contextValues.setToken).toHaveBeenCalledWith(null);
  });

  it('does not render header when token is null', () => {
    // Mock the context values with a null token
    const contextValues = {
      token: null,
      setToken: jest.fn(),
      email: 'your_mocked_email',
      setEmail: jest.fn(),
      rootsRadarRole: '0',
      setRootsRadarRole: jest.fn(),
      id: 'your_mocked_id',
      setId: jest.fn(),
    };

    render(
      <AuthTokenContext.Provider value={contextValues}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthTokenContext.Provider>,
    );

    // Expect the header not to be present in the document
    expect(screen.queryByTestId('header')).toBeNull();
  });
});
