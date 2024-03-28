import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import AppLayout from './ui/AppLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyles } from './styles/globalStyles';
import ProtectedRoutes from './ui/ProtectedRoutes';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to={'/home'} />,
      },
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
      // view other accounts
      {
        path: 'user/:id',
        element: <UserProfile key={'user-profile-page'} />,
        // loader: userProfileLoader(queryClient),
      },
      // user pages
      {
        path: 'settings',
        element: <div>settings page</div>,
      },
      {
        path: 'profile',
        element: <Profile />,
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
            fontSize: '1.4rem',
            zIndex: '999999',
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
