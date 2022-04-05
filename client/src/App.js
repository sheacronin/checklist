import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<TaskList user={user} />} />
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </main>
            <footer>App made by Shea Cronin</footer>
        </div>
    );
}

export default App;
