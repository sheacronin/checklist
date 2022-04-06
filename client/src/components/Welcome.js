import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
    return (
        <article className="welcome">
            <p>
                Welcome to the Checklist app! Please{' '}
                <Link to="/login">login</Link> or{' '}
                <Link to="/signup">sign up</Link> for an account to start adding
                tasks to your list.
            </p>
        </article>
    );
}

export default Welcome;
