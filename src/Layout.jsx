import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';

function Layout() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <Header/>
            <Outlet/>
            <Footer/>
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    )
}

export default Layout
