import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Error from './Error';
import { Provider } from 'react-redux'
import configureStore from './middleware/configureStore';
import './assets/scss/index.scss';

ReactDOM.render(
  <Error>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </Error>,
  document.getElementById('root')
);
