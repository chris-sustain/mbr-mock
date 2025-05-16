import { createBrowserRouter } from 'react-router';
import { CreateRefPage } from '@components/CreateRefPage';
import { SearchRefPage } from '@components/SearchRefPage';
import { RootLayout } from '@components/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <SearchRefPage />
      },
      {
        path: '/create',
        element: <CreateRefPage />
      }
    ]
  }
]);
