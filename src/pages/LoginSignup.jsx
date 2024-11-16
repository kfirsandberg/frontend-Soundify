import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'

export function LoginSignup() {
    return (
        <div className="login-page">
            <nav>
                <NavLink to="." className="white-link">Login</NavLink>
                <NavLink to="signup" className="white-link">Signup</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}