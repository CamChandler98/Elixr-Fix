import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
// import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as drinkActions from './store/drinks'
import * as reviewActions from './store/reviews'
import * as profileActions from './store/profile'
import * as friendActions from './store/friends'
import { ModalProvider } from './context/Modal';


const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.drinkActions = drinkActions;
  window.reviewActions = reviewActions
  window.profileActions = profileActions
  window.friendActions = friendActions
}

function Root() {
  return (
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
