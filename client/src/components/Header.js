import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import '../styles/Header.css';

function Header({ user, setUser, isLoading }) {
    function logoutUser() {
        setUser(null);
        fetch(`${API_BASE_URL}/users/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    }

    return (
        <header>
            <h1>
                <Link to="/">Checklist</Link>
            </h1>
            <nav>
                {!isLoading && (
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
                )}
            </nav>
        </header>
    );
}

export default Header;
