import React, { useState, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

export function AppHeader() {
    const [focused, setFocused] = useState(false)
    const inputWrapperRef = useRef(null)
    const params = useParams()
    const location = useLocation()

    const isHomePage = location.pathname === '/'

    function handleFocus() {
        setFocused(true)
    }

    function handleBlur() {
        setFocused(false)
    }

    return (
        <header className="app-header full">
            {/* Logo on the far left */}
            <Link to="/">
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
                        type="text"
                        placeholder="What do you want to play?"
                        className="header-search-input"
                        onFocus={handleFocus} // Handle focus
                        onBlur={handleBlur} // Handle blur
                    />
                    <button className="header-browse-btn" title="Browse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-encore-id="icon"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="browse-icon Svg-sc-ytk21e-0 bneLcE"
                        >
                            <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z" />
                        </svg>
                    </button>
                </div>
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
                <button className="header-icon-btn" title="User Name">
                    <img src="/assets/user.svg" alt="User Icon" className="header-icon" />
                </button>
            </div>
        </header>
    )
}
