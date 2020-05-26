import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './theme.scss';

ReactDOM.render(
  <React.StrictMode>
     <div className="app-loader" id="loader">
      <img src="./loading.gif" />
    </div> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
