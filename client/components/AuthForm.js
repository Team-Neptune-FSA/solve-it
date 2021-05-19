import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const AuthForm = ({ name, displayName }) => {
  const { login, signUp, error } = useAuth();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    await login(email, password);
  };

  const handleSignup = async (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const name = evt.target.name.value;
    await signUp(name, email, password);
  };

  console.log(displayName);
  return (
    <div className="component">
      <div id="login-window">
        <form
          onSubmit={name === "login" ? handleLogin : handleSignup}
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
          {name === "signup" ? (
            <div className="input-div">
              <label htmlFor="name">
                <small>Name</small>
              </label>
              <input name="name" type="text" className="login-input" />
            </div>
          ) : (
            ""
          )}
          <div className="input-div">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" className="login-input" />
          </div>
          {name === "login" ? (
            <div>
              New to Solve.it? Click{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                here{" "}
              </Link>{" "}
              to sign up!
            </div>
          ) : (
            <div>
              Already have an account? Click{" "}
              <Link to="/login" style={{ color: "blue" }}>
                here{" "}
              </Link>{" "}
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

export const Login = AuthForm;
export const Signup = AuthForm;
