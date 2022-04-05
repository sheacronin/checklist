import { Routes, Route } from 'react-router-dom';
import './App.css';
import TaskList from './components/TaskList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Header from './components/Header';

function App() {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </main>
            <footer>App made by Shea Cronin</footer>
        </div>
    );
}

export default App;
