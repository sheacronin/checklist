import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>
                <Link to="/">Checklist</Link>
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
