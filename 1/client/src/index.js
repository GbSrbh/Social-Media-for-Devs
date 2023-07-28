import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store ={store}> {/* Wrap everyhting inside provider (they all will have access to all of our redux states) */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
