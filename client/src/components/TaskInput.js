import { useState } from 'react';
import '../styles/TaskInput.css';

function TaskInput({ setTasks }) {
    const [newTask, setNewTask] = useState('');

    function onTaskChange(e) {
        setNewTask(e.target.value);
    }

    function onTaskSubmit(e) {
        e.preventDefault();

        setTasks((prevTasks) => {
            const taskToAdd = {
                // This is a tempory solution to unique ids while using dummy data
                id: Math.random(),
                text: newTask,
                isCompleted: false,
            };
            return [...prevTasks, taskToAdd];
        });

        setNewTask('');
    }

    return (
        <section className="task-input">
            <form onSubmit={onTaskSubmit}>
                <label htmlFor="task-text">New Task:</label>
                <div className="input-and-btn">
                    <input
                        value={newTask}
                        onChange={onTaskChange}
                        type="text"
                        name="task-text"
                        id="task-text"
                    />
                    <button type="submit">Submit Task</button>
                </div>
            </form>
        </section>
    );
}

export default TaskInput;
