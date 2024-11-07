import React, { useState } from 'react';
import { Search, Menu, X } from "lucide-react";
import { useDispatch } from 'react-redux';
import { movieCategory, movieSearchResult } from './movieSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let [movieName, setMovieName] = useState("");
    let navigate = useNavigate();
    let dispatch = useDispatch();

    return (
        <div className="bg-gray-900">
            <nav className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>MovieHub</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-baseline space-x-4">
                                <span
                                    onClick={() => dispatch(movieCategory("popular"))}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Popular
                                </span>
                                <span
                                    onClick={() => dispatch(movieCategory("toprated"))}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Top Rated
                                </span>
                                <span
                                    onClick={() => dispatch(movieCategory("upcomming"))}
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Upcoming
                                </span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <input
                                    className="w-64 bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                    placeholder="Movie Name"
                                    type="search"
                                    onChange={(e) => setMovieName(e.target.value)}
                                />
                                <button
                                    className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                                    onClick={() => dispatch(movieSearchResult(movieName))}
                                >
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                                >
                                    {isMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <span
                            onClick={() => dispatch(movieCategory("popular"))}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                        >
                            Popular
                        </span>
                        <span
                            onClick={() => dispatch(movieCategory("toprated"))}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                        >
                            Top Rated
                        </span>
                        <span
                            onClick={() => dispatch(movieCategory("upcomming"))}
                            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                        >
                            Upcoming
                        </span>
                    </div>
                    <div className="px-2 pt-2 pb-3">
                        <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            placeholder="Movie Name"
                            type="search"
                            onChange={(e) => setMovieName(e.target.value)}
                        />
                        <button
                            className="mt-2 w-full bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                            onClick={() => dispatch(movieSearchResult(movieName))}
                        >
                            <Search className="h-4 w-4 inline mr-2" />
                            Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
