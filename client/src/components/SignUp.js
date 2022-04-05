function SignUp() {
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
                <div className="form-control">
                    <label for="confirmPassword">Confirm Password:</label>
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
