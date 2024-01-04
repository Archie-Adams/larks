
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './src/Routes';

describe('Route tests with error handling', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<Router>{ui}</Router>);
  };

  // Tests for routes
  test('navigating to the sign-in page', () => {
    renderWithRouter(<Routes />, { route: '/auth/signin' });
  });

  test('navigating to the sign-up page', () => {
    renderWithRouter(<Routes />, { route: '/auth/signup' });
  });

  test('landing on the home page', () => {
    renderWithRouter(<Routes />, { route: '/home' });
  });

  test('navigating to the Paralysis Analysis page', () => {
    renderWithRouter(<Routes />, { route: '/paralysis-analysis' });
  });

  test('navigating to Skin Scan main page', () => {
    renderWithRouter(<Routes />, { route: '/skin-scan' });
  });

  test('navigating to Skin Scan take photo page', () => {
    renderWithRouter(<Routes />, { route: '/skin-scan/take_photo' });
  });

  test('navigating to Tonsillitis Detector main page', () => {
    renderWithRouter(<Routes />, { route: '/shreyas/shreyas' });
  });

  test('navigating to Tonsillitis Photo Instructions page', () => {
    renderWithRouter(<Routes />, { route: '/shreyas/tonsillitis_instructions' });
  });

  test('navigating to Dipstik Instructions page', () => {
    renderWithRouter(<Routes />, { route: '/dipstik' });
  });

  test('navigating to Dipstik Camera page', () => {
    renderWithRouter(<Routes />, { route: '/dipstik/dipstik-camera' });
  });

  test('navigating to Roots Radar page', () => {
    renderWithRouter(<Routes />, { route: '/roots-radar' });
  });

  test('navigating to EaseMind main page', () => {
    renderWithRouter(<Routes />, { route: '/EaseMind' });
  });

  test('navigating to EaseMind Personal Details page', () => {
    renderWithRouter(<Routes />, { route: '/EaseMind_personal_details' });
  });

  test('navigating to Autism Detector main page', () => {
    renderWithRouter(<Routes />, { route: '/autism_instructions' });
  });

  test('navigating to Autism Detector Personal Details page', () => {
    renderWithRouter(<Routes />, { route: '/autism_instructions/personaldetails' });
  });

  test('navigating to DepressiLess main page', () => {
    renderWithRouter(<Routes />, { route: '/DepressiLess' });
  });
 //todo: error handling
});
