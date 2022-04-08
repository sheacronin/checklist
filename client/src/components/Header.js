import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ user, setUser, isLoading }) {
    function logoutUser() {
        setUser(null);
        fetch('https://checklist-sc.herokuapp.com/users/logout', {
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
