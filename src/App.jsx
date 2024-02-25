import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Nav from './ui/Nav';

import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './styles/globalStyles';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <AppLayout />
      </>
    ),
    children: [
      // main pages
      {
        path: 'home',
        element: <div>home page</div>,
      },
      {
        path: 'explore',
        element: <div>explore page</div>,
      },
      {
        path: 'bookmarks',
        element: <div>bookmarks page</div>,
      },
      // user pages
      {
        path: 'settings',
        element: <div>settings page</div>,
      },
      {
        path: 'profile',
        element: (
          <div>
            profile page
            <Nav />
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools position="bottom" />
        <RouterProvider router={router} />;
        <GlobalStyles />
      </QueryClientProvider>
    </>
  );
}

export default App;
