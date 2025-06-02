import { createBrowserRouter } from 'react-router';

import { CreateRefFormPage } from '@components/CreateRefFormPage';
import { CreateRefPage } from '@components/CreateRefPage';
import { DraftsPage } from '@components/DraftsPage';
import { EditRefPage } from '@components/EditRefPage';
import { RefPage } from '@components/RefPage';
import { RootLayout } from '@components/RootLayout';
import { SearchRefPage } from '@components/SearchRefPage';
import { ValidationPage } from '@components/ValidationPage';

export const PATHS = {
  HOME: '/',
  NEW: '/new',
  DRAFTS: '/drafts',
  VALIDATION: '/validation',
  NEW_REFERENCE: '/reference/new',
  EDIT_REFERENCE: '/reference/:id/edit',
  REFERENCE: '/reference/:id'
};

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <SearchRefPage />
      },
      {
        path: PATHS.NEW,
        element: <CreateRefPage />
      },
      {
        path: PATHS.DRAFTS,
        element: <DraftsPage />
      },
      {
        path: PATHS.VALIDATION,
        element: <ValidationPage />
      },
      {
        path: PATHS.REFERENCE,
        element: <RefPage />
      },
      {
        path: PATHS.NEW_REFERENCE,
        element: <CreateRefFormPage />
      },
      {
        path: `${PATHS.EDIT_REFERENCE}`,
        element: <EditRefPage />
      }
    ]
  }
]);
