import './normalize.css';
import './index.scss';
import './translation/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { ReferenceFilterProvider } from '@src/contexts/ReferenceTableContext';
import { queryClient } from '@src/react-query/queryClient';
import { NotificationContainer } from '@components/NotificationSystem/NotificationSystem';

import { router } from './router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReferenceFilterProvider>
        <RouterProvider router={router} />
      </ReferenceFilterProvider>
      <ReactQueryDevtools />
      <NotificationContainer />
    </QueryClientProvider>
  </StrictMode>
);
