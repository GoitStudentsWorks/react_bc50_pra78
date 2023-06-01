import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';
import Auth from 'components/Auth/Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/react_bc50_pra78">
          <Auth>
            <App />
          </Auth>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
