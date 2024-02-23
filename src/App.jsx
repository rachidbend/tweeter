import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>app layout</div>,
    children: [
      // main pages
      {
        path: 'home',
        element: <p>home page</p>,
      },
      {
        path: 'explore',
        element: <p>explore page</p>,
      },
      {
        path: 'bookmarks',
        element: <p>bookmarks page</p>,
      },
      // user pages
      {
        path: 'settings',
        element: <p>settings page</p>,
      },
      {
        path: 'profile',
        element: <p>profile page</p>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
