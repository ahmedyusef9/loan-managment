import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // optional if you want global styles
import LoanManagementApp from './App.jsx'; // explicitly use .jsx extension

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoanManagementApp />
  </React.StrictMode>
);
