import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Welcome from './components/Welcome';
import { useEffect, useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchCurrentUser().then((user) => setUser(user));

        async function fetchCurrentUser() {
            const res = await fetch(
                'http://localhost:3001/users/current-user',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            const data = await res.json();
            return data.user;
        }
    }, []);

    return (
        <div>
            <Header user={user} setUser={setUser} />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            user === null ? (
                                <Welcome />
                            ) : (
                                <TaskList user={user} />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </main>
            <footer>
                App made by{' '}
                <a href="https://sheacronin.github.io/">Shea Cronin</a>
            </footer>
        </div>
    );
}

export default App;
