import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

export function LoginSignup() {
    return (
        <section className="login-page">
            <div className="hero-section">
                <div className="login-logo">
                    <img src="/assets/spotify_logo.svg" alt="Logo" className="logo" />
                </div>
                <h1 className="hero-heading">Use Soundify Today</h1>
            </div>
            <nav>
                <NavLink to="." className="nav-link">Log in</NavLink>
                <NavLink to="signup" className="nav-link">Signup</NavLink>
            </nav>
            <Outlet />
        </section>
    )
}