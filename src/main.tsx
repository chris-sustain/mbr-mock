import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import './translation/i18n';
import { RouterProvider } from 'react-router';
import { store } from '@src/store';
import { Provider } from 'react-redux';
import { router } from './router';
import './index.scss';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
