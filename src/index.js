import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TimecardsContextProvider } from './context/TimecardsContext'
import { EmployeesContextProvider } from './context/EmployeesContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TimecardsContextProvider>
        <EmployeesContextProvider>
        <App />
        </EmployeesContextProvider>
      </TimecardsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);