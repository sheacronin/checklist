import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Welcome from './components/Welcome';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    return (
        <div>
            <Header user={user} setUser={setUser} setToken={setToken} />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            user === null ? (
                                <Welcome />
                            ) : (
                                <TaskList user={user} token={token} />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login setUser={setUser} setToken={setToken} />
                        }
                    />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </main>
            <footer>App made by Shea Cronin</footer>
        </div>
    );
}

export default App;
