import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import App from './components/App/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
