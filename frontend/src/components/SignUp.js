import React, { useContext } from "react";
import axios from "axios";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthTokenContext } from "../App";

const INVALIDDETAILS = 0;
const USEREXISTS = 1;
const SUCCESS = 2;

let BASEURL = "";
process.env.NODE_ENV === "development"
  ? (BASEURL = process.env.REACT_APP_DEV)
  : (BASEURL = process.env.REACT_APP_PROD);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({ status: 500, message: "Network Error" });
    }
    return Promise.reject(error);
  }
);

const SignUp = () => {
  const { token, setToken } = useContext(AuthTokenContext);
  const [isValid, setIsValid] = React.useState(null);
  const [errorType, setErrorType] = React.useState(null); // New state for specific error type
  const [networkError, setNetworkError] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (email, password) => {
    try {
      const response = await axios.post(BASEURL + "register", {
        email: email,
        password: password,
      });
      return response;
    } catch (error) {
      return error.response || error;
    }
  };

  const validateSignup = async () => {
    if (!navigator.onLine) {
      setNetworkError(true);
      setIsValid(null); // Reset validation state when network error occurs
      return;
    }

    const email = document.getElementById("signup_email").value;
    const password = document.getElementById("signup_password").value;

    var passwordRules = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Reset errorType when attempting signup
    setErrorType(null);

    if (email.length > 0 && password.length > 0) {
      if (email.includes("@") && passwordRules.test(password)) {
        const response = await handleSubmit(email, password);

        if (response.status === 200) {
          setToken(response.data.token);
          setIsValid(SUCCESS);
          navigate("/home");
        } else if (response.status === 409) {
          setIsValid(USEREXISTS);
        } else {
          setIsValid(INVALIDDETAILS);
        }
        return;
      }
    }
    setIsValid(INVALIDDETAILS);
  };

  if (token) return <Navigate to="/home" />;

  return (
    <div className="authentication-container">
      <div className="authentication-background">
        <div className="App-body">
          <header className="authentication-header">
            <nav className="navbar navbar-dark bg-dark" id="navbar">
              {/* <a className="navbar-brand" href="#"></a> */}
              <h1 className="authentication-page-title"> LARKS APP</h1>
            </nav>
          </header>

          <div className="signup-form">
            <div>
              <h2 className="signup-title">Sign Up</h2>
              <p className="signup-subtitle">Create a new account below </p>
            </div>

            <input
              data-cy="signUpEmail"
              id="signup_email"
              className="authentication-form-input"
              type="text"
              placeholder="Email"
              aria-label="Enter Email"
            />

            <input
              data-cy="signUpPasswd"
              id="signup_password"
              className="authentication-form-input"
              type="password"
              placeholder="Password"
              aria-label="Enter Password"
            ></input>

            <div>
              <button
                data-cy="signUpBttn"
                id="signup_button"
                className="authentication-button"
                onClick={validateSignup}
              >
                Sign Up
              </button>
            </div>

            {isValid === INVALIDDETAILS && errorType !== "network" && !networkError && (
              <p data-cy="signUpError" className="error-message">
                Please enter a valid email and password. Passwords need to have minimum 10
                characters, uppercase, lowercase, and a special character.
              </p>
            )}
            {isValid === USEREXISTS && errorType !== "network" && !networkError && (
              <p data-cy="signUpError" className="error-message">
                A user with this email already exists.
              </p>
            )}
            {networkError && (
              <p className="error-message">Network error. Please check your internet connection.</p>
            )}

            <div className="signup-link-container">
              <Link to="/signin">
                <p className="login-link" data-cy="signUpLoginBttn" id="login_button">
                  {" "}
                  Already have an account? <b>Log In</b>{" "}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
