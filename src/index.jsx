import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import Config from './components/Config';
import configureStore from './store/configureStore';

// Setting the app title
document.title = Config.title;

// Counts VH units for correct work with mobile phones.
// Explanation: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const viewportUnitsHelper = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', viewportUnitsHelper);
viewportUnitsHelper();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
