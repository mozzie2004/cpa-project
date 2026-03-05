import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { AppRoute } from '@common/constants';
import { HomePage } from '@pages/Home';

import '@styles/global.scss';

const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <HomePage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
