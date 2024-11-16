import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
    const [users, setUsers] = useState([]);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const res = await axios.get('/api/user');
            // console.log('Users loaded:', res.data); // Log to inspect the data
            setUsers(res.data);
        } catch (err) {
            console.error('Error loading users:', err);
        }
    }

    async function onLogin(ev) {
        ev.preventDefault();
        setError(null);

        if (!credentials.username || !credentials.password) {
            setError('Username and password are required');
            return;
        }

        try {
            const res = await axios.post('/api/auth/login', credentials);
            console.log('User logged in:', res.data);
            navigate('/');
        } catch (err) {
            console.error('Login failed:', err);
            setError('Invalid username or password');
        }
    }

    function handleChange(ev) {
        const { name, value } = ev.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    }

    // console.log('Rendering users:', users); // Check if users are being mapped correctly

    return (
        <form className="login-form" onSubmit={onLogin}>
            <select
                name="username"
                value={credentials.username}
                onChange={handleChange}
            >
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user.username}>
                        {user.username} {/* Display username */}
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
            <button type="submit">Login</button>
        </form>
    );
}
