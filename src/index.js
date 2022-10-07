import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Amplify, Hub, Analytics } from 'aws-amplify';
import App from './note/App';
import reportWebVitals from './reportWebVitals';
import config from './aws-exports';

Amplify.configure(config);

Hub.listen('auth', async (data) => {
  switch (data.payload.event) {
    case 'signIn':
      Analytics.record({
        name: 'signIn',
        attributes: { username: data.payload.data.username }
      });
      break;
    case 'signUp':
      Analytics.record({
        name: 'signUp',
        attributes: { username: data.payload.data.username }
      });
      break;
    default:
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossOrigin="anonymous"
    />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
