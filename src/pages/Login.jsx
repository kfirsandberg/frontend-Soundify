import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userReducer, SET_USER } from '../store/reducers/user.reducer'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true) 

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const res = await axios.get('/api/user')
            setUsers(res.data)
            setLoading(false)
        } catch (err) {
            console.error('Error loading users:', err)
            setLoading(false)
            setError('Failed to load users')
        }
    }

    async function onLogin(ev) {
        ev.preventDefault()
        setError(null)

    
        if (!credentials.username || !credentials.password) {
            setError('Username and password are required')
            return;
        }
    
        try {
            const res = await axios.post('/api/auth/login', credentials)
            const { token, user } = res.data;
            userReducer(user, SET_USER)
    
            console.log('Full response from login API:', res)
            console.log('User logged in:', user)
            console.log('Token:', token)
    
            // Store token and user in localStorage (or localStorage)
            localStorage.setItem('authToken', token)
            localStorage.setItem('loggedInUser', JSON.stringify(user))
    
            // Check if values are set correctly
            console.log('Token saved to localStorage:', localStorage.getItem('authToken'))
            console.log('User saved to localStorage:', localStorage.getItem('loggedInUser'))
    
            navigate('/') // Redirect to the homepage or another page
        } catch (err) {
            console.error('Login failed:', err)
            setError('Invalid username or password')
        }
    }
    
    

    function handleChange(ev) {
        const { name, value } = ev.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    }

    return (
        <form className="login-form" onSubmit={onLogin}>
            <select
                name="username"
                value={credentials.username}
                onChange={handleChange}
                disabled={loading}
            >
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user.username}>
                        {user.username}
                    </option>
                ))}
            </select>
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
            />
            {error && <div className="error">{error}</div>}
            <button className='submit-btn' type="submit" disabled={loading}>Login</button>
            {loading && <div>Loading users...</div>} {/* Loading indicator */}
        </form>
    );
}
