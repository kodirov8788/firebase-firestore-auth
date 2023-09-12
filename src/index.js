import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Singlepage from "./pages/Singlepage/Singlepage"
import { ContextProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/single/:id' element={<Singlepage />} />
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
