import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@components/RootLayout';
import { CreateRefPage } from '@components/CreateRefPage';
import { SearchRefPage } from '@components/SearchRefPage';
import { CreateRefFromDraftPage } from '@components/CreateRefFromDraftPage';
import { ValidationPage } from '@components/ValidationPage';
import { EditRefPage } from '@components/EditRefPage';

export const PATHS = {
  HOME: '/',
  NEW: '/new',
  NEW_DRAFT: '/new/draft',
  VALIDATION: '/validation',
  NEW_REFERENCE: '/reference/new',
  EDIT_REFERENCE: '/reference/edit/:id'
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
        path: PATHS.NEW_DRAFT,
        element: <CreateRefFromDraftPage />
      },
      {
        path: PATHS.VALIDATION,
        element: <ValidationPage />
      },
      {
        path: PATHS.NEW_REFERENCE,
        element: <CreateRefPage />
      },
      {
        path: `${PATHS.EDIT_REFERENCE}`,
        element: <EditRefPage />
      }
    ]
  }
]);
