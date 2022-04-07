import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser, setToken }) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handleSubmission(e) {
        e.preventDefault();
        setErrors([]);
        const { username, password } = e.target.elements;

        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (res.status === 200) {
            setUser(data.user);
            // setToken(data.token);
            navigate('/');
        } else {
            setErrors((prevErrors) => [...prevErrors, data.info.message]);
        }
    }

    return (
        <article>
            <form className="auth-form" onSubmit={handleSubmission}>
                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            {errors.length > 0 && (
                <section className="errors">
                    {errors.map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </section>
            )}
        </article>
    );
}

export default Login;
