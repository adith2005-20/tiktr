import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import ShowFinder from './components/ShowFinder';
import ShowLister from './components/ShowLister';
import TicketPage from "./components/TicketPage";
import MyEvents from "./components/MyEvents";
import UseTicket from "./components/UseTicket"; // New page for burning ticket

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'About', element: <About /> },
      { path: 'FindShows', element: <ShowFinder /> },
      { path: 'ListShow', element: <ShowLister /> },
      { path: 'tickets', element: <TicketPage /> },
      { path: 'my-events', element: <MyEvents /> },
      { path: 'use-ticket', element: <UseTicket /> }, // Route for QR-triggered ticket burning
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
