import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticate, authenticateSignup } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleLogin, handleSignup, error } = props;
  return (
    <div className="component">
      <div id="login-window">
        <form
          onSubmit={name === 'login' ? handleLogin : handleSignup}
          name={name}
          id="login-form"
        >
          {error && error.response && <p> {error.response.data} </p>}
          <div className="input-div">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" className="login-input" />
          </div>
          {name === 'signup' ? (
            <div className="input-div">
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input name="name" type="text" className="login-input" />
            </div>
          ) : (
            ''
          )}
          <div className="input-div">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" className="login-input" />
          </div>
          {name === 'login' ? (
            <div>
              Don't have an account? Click{' '}
              <Link to="/signup" style={{ color: 'blue' }}>
                here{' '}
              </Link>{' '}
              to sign up!
            </div>
          ) : (
            <div>
              Already have an account? Click{' '}
              <Link to="/login" style={{ color: 'blue' }}>
                here{' '}
              </Link>{' '}
              to log in!
            </div>
          )}
          <button type="submit" id="form-submit">
            {displayName}
          </button>
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogin(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
    handleSignup(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const name = evt.target.name.value;
      dispatch(authenticateSignup(email, password, formName, name));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
