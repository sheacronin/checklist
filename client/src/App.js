import './App.css';
import TaskList from './components/TaskList';

function App() {
    return (
        <div>
            <header>
                <h1>Checklist</h1>
            </header>
            <main>
                <TaskList />
            </main>
            <footer>App made by Shea Cronin</footer>
        </div>
    );
}

export default App;
