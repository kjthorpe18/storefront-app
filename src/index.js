import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './static/index.css';

import About from './views/About';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}>
          <Route path="about" element={<About />} />
        </Route>        
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
