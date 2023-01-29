import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { MessageProviderWrapper } from './context/userMessage.context';
import { AuthProviderWrapper } from './context/auth.context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <MessageProviderWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </MessageProviderWrapper>
    </Router>
  </React.StrictMode>
);
