import { useState } from 'react';
import '../styles/TaskInput.css';

function TaskInput({ setTasks, token, user }) {
    const [newTask, setNewTask] = useState('');

    function onTaskChange(e) {
        setNewTask(e.target.value);
    }

    async function onTaskSubmit(e) {
        e.preventDefault();

        const data = await postTask();
        console.log(data);

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

    async function postTask() {
        console.log(token);
        console.log(user.id);
        const res = await fetch('http://localhost:3001/tasks/', {
            method: 'POST',
            body: JSON.stringify({
                text: newTask,
                userId: user.id,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
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
