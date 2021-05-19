import React, { useContext, useState } from "react";
import history from "../history";
import axios from "axios";
export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const TOKEN = "token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});

  const login = async (email, password) => {
    try {
      const res = await axios.post(`/auth/login`, { email, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      getCurrentUser();
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const res = await axios.post(`/auth/signup`, {
        email,
        password,
        name,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      getCurrentUser();
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN);
    setUser({});
    history.push("/");
  };

  const getCurrentUser = async () => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: currentUser } = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      setUser(currentUser);
    }
  };

  const value = {
    isLoggedIn: !!user.id,
    user: user,
    error: error,
    login,
    signUp,
    logout,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
