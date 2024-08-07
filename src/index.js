import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import AppContent from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import authConfig from "./config.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home.js";

//edited again
const AppContent = () => {
  const { error } = useAuthContext();

  return (
          <Router>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  {/* <Route element={<NotFoundPage />} /> */}
              </Routes>
          </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider config={authConfig}>
        <AppContent />
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
