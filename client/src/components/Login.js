import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const navigate = useNavigate();

    async function handleSubmission(e) {
        e.preventDefault();
        const { username, password } = e.target.elements;

        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
            setUser(data.user);
            navigate('/');
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
        </article>
    );
}

export default Login;
