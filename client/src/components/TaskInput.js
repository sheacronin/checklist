import { useState } from 'react';
import { API_BASE_URL } from '../constants';
import '../styles/TaskInput.css';

function TaskInput({ setTasks, user }) {
    const [newTask, setNewTask] = useState('');

    function onTaskChange(e) {
        setNewTask(e.target.value);
    }

    async function onTaskSubmit(e) {
        e.preventDefault();

        const data = await postTask();

        setTasks((prevTasks) => {
            const taskToAdd = {
                _id: data.task._id,
                text: data.task.text,
                isCompleted: data.task.isCompleted,
            };
            return [...prevTasks, taskToAdd];
        });

        setNewTask('');
    }

    async function postTask() {
        const res = await fetch(`${API_BASE_URL}/tasks/`, {
            method: 'POST',
            body: JSON.stringify({
                text: newTask,
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
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
