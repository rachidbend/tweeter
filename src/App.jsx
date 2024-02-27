import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Nav from './ui/Nav';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './styles/globalStyles';
import ProtectedRoutes from './ui/ProtectedRoutes';

import { Toaster } from 'react-hot-toast';
import Signup from './features/auth/Signup';
import Login from './features/auth/Login';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      // main pages
      {
        path: 'home',
        element: <Home key={'home-page'} />,
      },
      {
        path: 'explore',
        element: <Explore key={'explore-page'} />,
      },
      {
        path: 'bookmarks',
        element: <Bookmarks key={'bookmarks-page'} />,
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

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            fontFamily: 'var(--font-noto)',
          },
        }}
      />
      <ReactQueryDevtools position="bottom" />
      <RouterProvider router={router} />
      <GlobalStyles />
    </QueryClientProvider>
  );
}

export default App;
