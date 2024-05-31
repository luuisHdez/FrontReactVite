import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HamburgerIcon from '../assets/hamburger-list-menu.svg';

function AuthenticatedNav() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        // Function to handle clicking outside the sidebar to close it
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.sidebar') && isOpen) {
                setIsOpen(false);
            }
        };

        // Adding click event listener to document
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);  // Dependency array to rebind the effect when isOpen changes

    return (
        <div>
            <header className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-4 px-6 flex justify-between items-center">
                <button
                    className="w-10 h-10 p-1 ring-1 ring-gray-300 dark:ring-gray-500"
                    style={{ backgroundColor: 'white'}}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img src={HamburgerIcon} alt="Menu" className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold dark:hover:text-gray-400">Pyreact</h1>
                <button style={{ backgroundColor: 'white'}} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500">
                    <img src={HamburgerIcon} alt="Menu" className="w-5 h-5" />
                </button>
            </header>

            {/* Overlay that appears when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`sidebar fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 z-40 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <button
                    className="absolute top-0 right-0 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <svg
                        className="w-6 h-6 text-gray-700 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <h5 className="text-xl font-semibold text-gray-700 dark:text-gray-300 p-4">Menu</h5>
                <ul className="flex flex-col p-4">
                    <li className="mb-2">
                         
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-150">
                            Settings
                        </a>
                    </li>
                    <li className="mb-2">
                        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-150">
                            Profile
                        </a>
                    </li>
                    <li className="mb-2">
                        <button onClick={handleLogout} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-150">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            
        </div>
    );
}

export default AuthenticatedNav;
