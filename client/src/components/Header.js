import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ user, setUser, setToken }) {
    function logoutUser() {
        setUser(null);
        setToken('');
    }

    return (
        <header>
            <h1>
                <Link to="/">Checklist</Link>
            </h1>
            <nav>
                <ul>
                    {user === null ? (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button onClick={logoutUser}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
