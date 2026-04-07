import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { AppRoute } from '@common/constants';
import { HomePage } from '@pages/Home';

import '@styles/global.scss';
import { ModalProvider } from '@features/ModalProvider';
import NotFoundPage from '@pages/NotFound';

const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      { path: ':locale', element: <HomePage /> }
    ]
  },
  {
    path: AppRoute.ANY,
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>
);
