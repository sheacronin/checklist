import '../styles/Task.css';

function Task({ task, setTasks, token, user }) {
    function toggleTaskCompleted() {
        putToggleTaskCompleted();

        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            const i = newTasks.indexOf(task);
            const taskToChange = { ...newTasks[i] };
            taskToChange.isCompleted = !taskToChange.isCompleted;
            newTasks[i] = taskToChange;
            return newTasks;
        });
    }

    async function putToggleTaskCompleted() {
        const res = await fetch(
            `http://localhost:3001/tasks/${task._id}/toggle-complete`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        console.log(data);
    }

    async function deleteTask() {
        await removeTask();
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            const i = newTasks.indexOf(task);
            newTasks.splice(i, 1);
            return newTasks;
        });
    }

    async function removeTask() {
        const res = await fetch(`http://localhost:3001/tasks/${task._id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                userId: user.id,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <li className={task.isCompleted ? 'task completed-task' : 'task'}>
            <button
                className="complete-task-btn"
                onClick={toggleTaskCompleted}
            ></button>
            {task.text}
            <button className="delete-task-btn" onClick={deleteTask}></button>
        </li>
    );
}

export default Task;
