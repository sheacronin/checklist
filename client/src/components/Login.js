function Login() {
    return (
        <article>
            <form>
                <div className="form-control">
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="form-control">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </article>
    );
}

export default Login;
