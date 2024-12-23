import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { search, chatSearch, setIsSearch } from '../store/actions/station.actions.js';
import { userService } from '../services/user/user.service.remote.js'
import { debounce } from '../services/util.service.js';

export function AppHeader() {
    const [focused, setFocused] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAI, setIsAI] = useState(false);

    const inputWrapperRef = useRef(null)
    const inputTextRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    const isHomePage = location.pathname === '/'
    useEffect(() => {
        if (location.pathname === '/') {
            clearSearchInput()
        }
    }, [location.pathname])

    async function clearSearchInput() {
        if (inputTextRef.current) {
            inputTextRef.current.value = ''
        }
        await search('')
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('authToken')
            const user = JSON.parse(localStorage.getItem('loggedInUser'))
            if (!token || !user) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const response = await userService.validateToken(token)  
                console.log('Token validation response:', response)


                setIsLoggedIn(response.isLoggedIn)
            } catch (err) {
                console.error('Error checking login status', err)
                setIsLoggedIn(false)
            }
        }

        checkLoginStatus() 
    }, [])



    const handleLogout = async () => {
        try {
            await userService.logout();  
            localStorage.removeItem('authToken') 
            localStorage.removeItem('loggedInUser')  
            setIsLoggedIn(false) 
            setShowModal(false) 
            socketService.logout() 
            navigate('/') 
        } catch (err) {
            console.error('Logout failed', err)
        }
    };

    const handleUserClick = () => {
        if (isLoggedIn) {
            setShowModal(true)
        } else {
            navigate('/LoginSignup')
        }
    };

    function handleFocus() {
        setFocused(true)
    }

    function handleBlur() {
        setFocused(false)
    }

    const debouncedSearch = debounce(async (value) => {
        if (!value) return;
        try {
            if (isAI) {
                setIsSearch(true)
                const results = await chatSearch(value);
                setIsSearch(false)
                navigate(`/playlist/${results._id}`);
            } else {
                setIsSearch(true)
                await search(value);
                setIsSearch(false)
                navigate(`/search/${value}`);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    }, 300);

    async function handleInputChange(ev) {

        const value = ev.target.value;
        debouncedSearch(value);

    }

    return (
        <header className="app-header full">
            {/* Logo on the far left */}
            <Link to="/" style={{ zIndex: 1000 }}>
                <img src="/assets/spotify_logo.svg" alt="Logo" className="logo" />
            </Link>

            {/* Center content: button and search input bar */}
            <div className="header-center-content">
                <Link to="/">
                    <button className="header-home-btn" title="Home">
                        {isHomePage ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="home-icon Svg-sc-ytk21e-0 bneLcE"
                            >
                                <path
                                    d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"
                                    fill="#ffffff"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                data-encore-id="icon"
                                role="img"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="home-icon Svg-sc-ytk21e-0 bneLcE"
                            >
                                <path
                                    d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"
                                    fill="#b3b3b3"
                                />
                            </svg>
                        )}
                    </button>
                </Link>


                <div className={`input-wrapper ${focused ? 'focused' : ''}`} ref={inputWrapperRef}>
                    <button className="header-search-btn" title="Search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="search-icon Svg-sc-ytk21e-0 bneLcE"
                        >
                            <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" />
                        </svg>
                    </button>

                    <input
                        ref={inputTextRef}
                        type="text"
                        placeholder="What do you want to play?"
                        className="header-search-input"
                        onFocus={handleFocus} // Handle focus
                        onBlur={handleBlur} // Handle blur
                        onChange={handleInputChange}
                    />
                    <Link to="/browse" style={{ zIndex: 1000 }}>
                        <button className="header-browse-btn" data-title="Browse" onClick={() => navigate('/browse')}>
                            {location.pathname === '/browse' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="browse-icon Svg-sc-ytk21e-0 bneLcE"
                                >
                                    <path
                                        d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z"
                                        fill="#ffffff"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-encore-id="icon"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="browse-icon-empty Svg-sc-ytk21e-0 bneLcE"
                                >
                                    <path
                                        d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                                        fill="#b3b3b3"
                                    />
                                    <path
                                        d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"
                                        fill="#b3b3b3"
                                    />
                                </svg>
                            )}
                        </button>
                    </Link>
                </div>
                <button
                    className={`header-ai-btn ${isAI ? 'active' : ''}`}
                    title="Search with AI"
                    onClick={() => setIsAI(!isAI)}
                >
                    <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 490 490" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M416,0H74C33.3,0,0,33.4,0,74v342c0,40.7,33.4,74,74,74h342c40.7,0,74-33.4,74-74V74C490,33.4,456.6,0,416,0z M449.3,416
			c0,18.8-14.6,33.4-33.4,33.4H74c-18.8,0-33.4-14.6-33.4-33.4V74c0-18.8,14.6-33.4,33.4-33.4h342c18.8,0,33.4,14.6,33.4,33.4v342
			H449.3z"/>
                                <g>
                                    <path d="M234.8,169.8c-2.4-5.5-7.8-9-13.8-9s-11.4,3.5-13.8,9L147,308.3c-3.3,7.6,0.2,16.4,7.8,19.7c2,0.9,4,1.3,6,1.3
				c5.8,0,11.3-3.4,13.8-9l13.2-30.2h66.9l13.2,30.2c3.3,7.6,12.1,11.1,19.7,7.8c7.6-3.3,11.1-12.2,7.8-19.7L234.8,169.8z
				 M200.7,260l20.4-46.8l20.4,46.8H200.7z"/>
                                    <path d="M329.3,217.9c-8.3,0-15,6.7-15,15v81.4c0,8.3,6.7,15,15,15s15-6.7,15-15v-81.4C344.3,224.6,337.6,217.9,329.3,217.9z" />
                                    <path d="M329.3,166.4c-8.3,0-15,6.7-15,15v4c0,8.3,6.7,15,15,15s15-6.7,15-15v-4C344.3,173.1,337.6,166.4,329.3,166.4z" />
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>

            {/* Icon buttons on the right */}
            <div className="header-icon-btns">
                <button className="notification-btn" title="What's New">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-encore-id="icon"
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="notification-icon Svg-sc-ytk21e-0 dYnaPI"
                    >
                        <path
                            d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z"
                            fill="#b3b3b3"
                        />
                    </svg>
                </button>
                <button className="header-icon-btn" title="User Name" onClick={handleUserClick}>
                    <img src="/assets/user.svg" alt="User Icon" className="header-icon" />
                </button>
            </div>

            {/* Logout Modal */}
            {showModal && (
                <dialog className="logout-modal" open={showModal} style={{ zIndex: 4 }}>
                    <div className="modal-content">
                        <p>Are you sure you want to log out?</p>
                        <button className="modal-content-btn" onClick={handleLogout}>Log Out</button>
                        <button className="modal-content-btn" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </dialog>
            )}
        </header>
    )
}


