import './normalize.css';
import './index.scss';

import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import './translation/i18n';
import { RouterProvider } from 'react-router';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@src/react-query/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NotificationContainer } from '@components/NotificationSystem/NotificationSystem';
const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
      <NotificationContainer />
    </QueryClientProvider>
  </StrictMode>
);
