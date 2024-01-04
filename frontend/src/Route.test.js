import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthTokenContext } from './App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// renderWithRouter to include AuthTokenContext with a mock token
const renderWithRouterAndAuth = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <AuthTokenContext.Provider value={{ token: 'mockToken', setToken: () => {} }}>
      <Router>
        {ui}
      </Router>
    </AuthTokenContext.Provider>
  );
};

beforeEach(() => {
  // Mock sessionStorage
  Storage.prototype.getItem = jest.fn(() => '"test@example.com"'); // Mocks email string including JSON string quotes
});

describe('SignIn Component', () => {
  const mockSetToken = jest.fn();

  beforeEach(() => {
    render(
      <AuthTokenContext.Provider value={{ token: null, setToken: mockSetToken }}>
        <Router>
          <SignIn />
        </Router>
      </AuthTokenContext.Provider>
    );
  });

  test('renders email and password input fields', () => {
    expect(screen.getByLabelText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Password/i)).toBeInTheDocument();
  });

  test('allows the user to enter email and password', () => {
    fireEvent.change(screen.getByLabelText(/Enter Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), { target: { value: 'Password123!' } });

    expect(screen.getByLabelText(/Enter Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Enter Password/i).value).toBe('Password123!');
  });
});

describe('SignUp Component', () => {
  const mockSetToken = jest.fn();

  beforeEach(() => {
    render(
      <AuthTokenContext.Provider value={{ token: null, setToken: mockSetToken }}>
        <Router>
          <SignUp />
        </Router>
      </AuthTokenContext.Provider>
    );
  });

  test('renders email and password input fields for sign up', () => {
    expect(screen.getByLabelText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Password/i)).toBeInTheDocument();
  });

  test('allows the user to enter email and password for sign up', () => {
    fireEvent.change(screen.getByLabelText(/Enter Email/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Enter Password/i), { target: { value: 'NewPassword123!' } });

    expect(screen.getByLabelText(/Enter Email/i).value).toBe('newuser@example.com');
    expect(screen.getByLabelText(/Enter Password/i).value).toBe('NewPassword123!');
  });

});

describe('Route tests with error handling', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<Router>{ui}</Router>);
  };

  // Tests for routes
  test('landing on the home page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/home' });
    expect(screen.getByAltText('home')).toBeInTheDocument();

    // Check for each app link
    expect(screen.getByAltText('Skin-Scan_App_Kevin')).toBeInTheDocument();
    expect(screen.getByAltText('Dipstik_App_Lanre')).toBeInTheDocument();
    expect(screen.getByAltText('Stroke_App_Ramat')).toBeInTheDocument();
    expect(screen.getByAltText('Tonsilitis_App_Shreyas')).toBeInTheDocument();
    expect(screen.getByAltText('Roots Radar App')).toBeInTheDocument();
    expect(screen.getByAltText('EaseMind App')).toBeInTheDocument();
    expect(screen.getByAltText('Autism_App')).toBeInTheDocument();
    expect(screen.getByAltText('chatbotLogo')).toBeInTheDocument();
    expect(screen.getByAltText('DepressiLess App')).toBeInTheDocument();
  });

  test('navigating to the Paralysis Analysis page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/paralysis-analysis' });
    expect(screen.getByText(/Straighten your head as best as you can, keep a neutral expresssion and take a picture./)).toBeInTheDocument();
  });

  test('navigating to Skin Scan main page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/skin-scan' });
    expect(screen.getByText('Skin Scan')).toBeInTheDocument();
    expect(screen.getByText('Product Disclaimer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  test('navigating to Skin Scan take photo page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/skin-scan/take_photo' });
    expect(screen.getByText('Skin Scan')).toBeInTheDocument();
    expect(screen.getByText('Image Submission')).toBeInTheDocument();
  });

  test('navigating to Skin Scan outcome positive', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/skin-scan/outcome_positive' });
    expect(screen.getByText('Skin Scan')).toBeInTheDocument();
    expect(screen.getByText('Image Analysis Results')).toBeInTheDocument();
    expect(screen.getByText('Outcome - Positive')).toBeInTheDocument();
    expect(screen.getByText(/Prediction Probability:/)).toBeInTheDocument();
  });

  test('navigating to Skin Scan outcome negative', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/skin-scan/outcome_negative' });
  
    // Check for the presence of specific elements on the outcome negative page
    expect(screen.getByText('Skin Scan')).toBeInTheDocument();
    expect(screen.getByText('Image Analysis Results')).toBeInTheDocument();
    expect(screen.getByText('Outcome - Benign')).toBeInTheDocument();
    expect(screen.getByText(/Prediction Probability:/)).toBeInTheDocument();
  });

  test('navigating to Skin Scan instructions', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/skin-scan/instructions' });
    expect(screen.getByText('Skin Scan')).toBeInTheDocument();
    expect(screen.getByText('Instructions:')).toBeInTheDocument();
    expect(screen.getByText(/Please read the following instructions carefully/)).toBeInTheDocument();
  });

  test('navigating to shreyas Detector main page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/shreyas/shreyas' });
    expect(screen.getByText("Shreyas' app")).toBeInTheDocument();
    expect(screen.getByText(/Webcam capture below/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  test('navigating to shreyas Photo Instructions page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/shreyas/tonsillitis_instructions' });
    expect(screen.getByText('Instructions for using the tonsillitis detector')).toBeInTheDocument();
    expect(screen.getByText(/This diagnostic tool has been found to have 88% accuracy in testing/)).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(4); 
    expect(screen.getByAltText('Example picture')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  test('navigating to shreyas tonsillitis outcome 1', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/shreyas/tonsillitis_outcome_1' });
    expect(screen.getByText('Outcome of your results')).toBeInTheDocument();
    expect(screen.getByText("You aren't showing any signs of throat infection!")).toBeInTheDocument();
    expect(screen.getByText('Enjoy the rest of your day :)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go back to home' })).toBeInTheDocument();
  });

  test('navigating to shreyas tonsillitis outcome 2', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/shreyas/tonsillitis_outcome_2' });
    expect(screen.getByText('Outcome of your results')).toBeInTheDocument();
    expect(screen.getByText('You may have tonsillitis or are showing early signs of tonsillitis!')).toBeInTheDocument();
    expect(screen.getByText('Please observe the following questions:')).toBeInTheDocument();
    expect(screen.getByText('Is there swelling on your tonsils with yellow spots?')).toBeInTheDocument();
    expect(screen.getByText('If you have answered YES to 3 or more of the above questions, there is a high probability you have contracted Bacterial Tonsillitis. Please contact your GP immediately.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go back to home' })).toBeInTheDocument();
  });

  test('navigating to Dipstik Instructions page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/dipstik' });
    expect(screen.getByText('Welcome to dipstik')).toBeInTheDocument();
    expect(screen.getByText('Disclaimer! (1/3)')).toBeInTheDocument();
    expect(screen.getByText(/not intended to treat, diagnose, or cure any conditions/)).toBeInTheDocument();
  });

  test('navigating to Dipstik Camera page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/dipstik/dipstik-camera' });
    expect(screen.getByText('Fit the dipstick within the guides')).toBeInTheDocument();
  });

  test('navigating to Dipstik Timer', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/dipstik/dipstik-timer' });
    expect(screen.getByText(/:/)).toBeInTheDocument(); 
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument();
  });

  test('navigating to Dipstik result', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/dipstik/dipstik-results' });
    expect(screen.getByText('Dipstik Results')).toBeInTheDocument();
    expect(screen.getByText('By Parameters')).toBeInTheDocument();
    expect(screen.getByText('By Health Conditions')).toBeInTheDocument();
    expect(screen.getByText(/LEUKOCYTES/)).toBeInTheDocument();
    expect(screen.getByText(/Nitrite/)).toBeInTheDocument();
  });

  test('navigating to Roots Radar page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/roots-radar' });
    expect(screen.getByText('Roots Radar')).toBeInTheDocument();
    expect(screen.getByText('get text of id')).toBeInTheDocument();
    expect(screen.getByText('add new text in db')).toBeInTheDocument();
  });
  
  test('navigating to EaseMind main page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/EaseMind' });
    expect(screen.getByRole('button', { name: 'Create My Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anxiety Level Test' })).toBeInTheDocument();
    expect(screen.getByText('Warning:')).toBeInTheDocument();
    expect(screen.getByText(/This website is a project developed by a computer science student/)).toBeInTheDocument();
  });

  test('navigating to EaseMind Personal Details page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/EaseMind_personal_details' });
    expect(screen.getByText('Please fill in the details below:')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
    expect(screen.getByLabelText('Address:')).toBeInTheDocument();
  });

  test('navigating to Autism Detector Personal Details page', async () => {
    renderWithRouterAndAuth(<Routes />, { route: '/autism_instructions/personaldetails' });
    screen.debug(); 
    const personalDetailsText = await screen.findByText('Please put in your personal details below:');
    expect(personalDetailsText).toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Date of Birth:')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Details' })).toBeInTheDocument();
  });

  test('navigating to Autism Detector main page', async () => {
    renderWithRouterAndAuth(<Routes />, { route: '/autism_instructions' });
    screen.debug(); 
    const adviceForAutismText = await screen.findByText('Advice for Autism:');
    expect(adviceForAutismText).toBeInTheDocument();
    expect(screen.getByAltText('Personal Details')).toBeInTheDocument();
    expect(screen.getByAltText('Questionnaire')).toBeInTheDocument();
  });

  test('navigating to DepressiLess main page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/DepressiLess' });
    expect(screen.getByAltText('User Profile')).toBeInTheDocument();
    expect(screen.getByAltText('Chat with Support')).toBeInTheDocument();
    expect(screen.getByAltText('Fill Questionnaire')).toBeInTheDocument();
    expect(screen.getByAltText('Online Resources')).toBeInTheDocument();
  });

  test('navigating to the error 400 page', () => {
    renderWithRouterAndAuth(<Routes />, { route: '/error400' });
    expect(screen.getByText('Bad HTTP Request')).toBeInTheDocument();
    });
});
export default renderWithRouterAndAuth;