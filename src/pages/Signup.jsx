import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../store/actions/user.actions';
import { ImgUploader } from '../cmps/ImgUploader';

export function Signup() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        imgUrl: ''
    });
    const [error, setError] = useState(null); // To handle error messages
    const [success, setSuccess] = useState(false); // To handle success message
    const [loading, setLoading] = useState(false); // Loading state for the button
    const navigate = useNavigate();

    function clearState() {
        setCredentials({ username: '', password: '', imgUrl: '' });
        setSuccess(false);
    }

    function handleChange(ev) {
        const { name, value } = ev.target;
        setCredentials({ ...credentials, [name]: value });
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault();

        if (!credentials.username || !credentials.password) {
            setError('Please provide both a username and password.');
            return;
        }

        setLoading(true); // Show loading spinner

        try {
            await signup(credentials);
            setLoading(false);
            setSuccess(true); // Show success message
            clearState(); // Clear form on successful signup
            // setTimeout(() => navigate('/'), 2000); // Redirect after a short delay to show success
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data : 'Failed to sign up. Please try again.');
        }
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl });
    }

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />

            {/* Show error or success messages */}
            {error && <div className="error">{error}</div>}
            {success && <div className="success">Signup successful! Redirecting...</div>}

            {/* Show loading spinner */}
            {loading ? <div>Loading...</div> : <button type="submit">Signup</button>}
        </form>
    );
}
