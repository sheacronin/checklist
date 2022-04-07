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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCurrentUser().then((data) => {
            if (data) {
                setUser(data.user);
                setIsLoading(false);
            }
        });

        async function fetchCurrentUser() {
            const res = await fetch(
                'http://localhost:3001/users/current-user',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            if (res.status === 401) {
                setIsLoading(false);
                return;
            }
            const data = await res.json();
            return data;
        }
    }, []);

    const indexElement = (() => {
        if (isLoading) {
            return <main className="loading">Loading...</main>;
        }

        if (user === null) {
            return <Welcome />;
        } else {
            return <TaskList user={user} />;
        }
    })();

    return (
        <div>
            <Header user={user} setUser={setUser} isLoading={isLoading} />
            <main>
                <Routes>
                    <Route path="/" element={indexElement} />
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
