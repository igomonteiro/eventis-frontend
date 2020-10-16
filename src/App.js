import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <ToastContainer
            draggablePercent={60}
            transition={Zoom}
            autoClose={2500}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
