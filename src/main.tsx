import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { BrowserRouter, Router } from 'react-router-dom';
import { AuthProvider } from './app/main components/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './app/features/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
