import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import ShowFinder from './components/ShowFinder'
import ShowLister from './components/ShowLister'
import ConcertDetails from './components/ConcertDetails'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[{
      path:'',
      element:<Home/>
    },
    {
      path:'About',
      element:<About/>
    },
    {
      path:'FindShows',
      element:<ShowFinder/>
    },
    {
      path:'ListShow',
      element:<ShowLister/>
    },
    {
      path:"Concerts/:id",
      element:<ConcertDetails/>
    }
  ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
