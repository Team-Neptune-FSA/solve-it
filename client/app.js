import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import { AuthProvider } from "./context/auth";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes />
    </AuthProvider>
  );
};

export default App;
