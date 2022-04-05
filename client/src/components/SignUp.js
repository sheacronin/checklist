import { useNavigate } from 'react-router-dom';

function SignUp() {
    let navigate = useNavigate();

    function handleSubmission(e) {
        e.preventDefault();
        const { username, password, confirmPassword } = e.target.elements;
        if (password.value !== confirmPassword.value) {
            console.log('Your passwords do not match!');
            return;
        }

        fetch('http://localhost:3001/users/', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        navigate('/login');
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
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </article>
    );
}

export default SignUp;
