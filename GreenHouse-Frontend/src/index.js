import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { GreenHouse } from './components/GreenHouse';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GreenHouse />
    </BrowserRouter>   
  </React.StrictMode>
);

