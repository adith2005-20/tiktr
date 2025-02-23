import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useState} from 'react'
export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5 text-white">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src='/tiktrlogo.png'
                            className="mr-3 h-12 scale-75"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        
                        <Link
                            to="#"
                            className="text-white font-serif font-extralight bg-orange-700 hover:bg-gray-200 hover:text-black focus:ring-4 focus:ring-orange-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Link with MetaMask
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/"
                                    className={({isActive}) =>
                                        `${isActive?'text-orange-400':'text-gray-700' }block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/About"
                                    className={({isActive}) =>
                                        `${isActive?'text-orange-400':'text-gray-700' }block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/FindShows"
                                    className={({isActive}) =>
                                        `${isActive?'text-orange-400':'text-gray-700' }block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Find shows
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/ListShow"
                                    className={({isActive}) =>
                                        `${isActive?'text-orange-400':'text-gray-700' }block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    List a show
                                </NavLink>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

