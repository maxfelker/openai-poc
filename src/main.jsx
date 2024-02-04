import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/'

if(import.meta.env.VITE_API_BASE_URL) {
  window.API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
}

if(!localStorage.getItem('api-base-url')) {
  localStorage.setItem('api-base-url', window.API_BASE_URL);
}

if(!localStorage.getItem('first-visit')) {
  localStorage.setItem('first-visit', true);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
