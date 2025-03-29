import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import tiktrlogo from '../assets/images/tiktrlogo.png'
import { FacebookIcon, GithubIcon, SlackIcon, TwitterIcon, X, XIcon } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black border-y text-white">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center scale-50">
                            <img
                                src={tiktrlogo}
                                className="mr-3 h-16"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Resources</h2>
                            <ul className="text-gray-200 font-medium">
                                <li className="mb-4">
                                <Link 
                                    to="/" 
                                    onClick={() => {scrollTo(0, 0)}}
                                    className="hover:underline"
                                    >
                                    Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/About" onClick={() => {scrollTo(0,0)}} className="hover:underline">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Follow us</h2>
                            <ul className="text-gray-200 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/7void"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">
                                        Discord
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Legal</h2>
                            <ul className="text-gray-200 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-200 sm:text-center">
                        ©
                        <a href="https://github.com/adith2005-20/tiktr" className="hover:underline">
                            2025 tiktr
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <Link to="#" className="text-gray-500 hover:text-gray-900">
                            <FacebookIcon/>
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        
                        <Link to="#" className="text-gray-500">
                            <TwitterIcon/>
                            <span className="sr-only">Twitter page</span>
                        </Link>
                        <Link to="#" className="text-gray-500">
                            <GithubIcon/>
                            <span className="sr-only">GitHub account</span>
                        </Link>
                        <Link to="#" className="text-gray-500">
                            <SlackIcon/>
                            <span className="sr-only">Slack account</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}