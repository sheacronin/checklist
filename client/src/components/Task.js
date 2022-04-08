import '../styles/Task.css';

function Task({ task, setTasks, user }) {
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
        await fetch(
            `https://checklist-sc.herokuapp.com/tasks/${task._id}/toggle-complete`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
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
        const res = await fetch(
            `https://checklist-sc.herokuapp.com/tasks/${task._id}`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await res.json();
        console.log(data);
    }

    return (
        <li className={task.isCompleted ? 'task completed-task' : 'task'}>
            <button
                className="complete-task-btn"
                onClick={toggleTaskCompleted}
            ></button>
            <span dangerouslySetInnerHTML={{ __html: task.text }} />
            <button className="delete-task-btn" onClick={deleteTask}></button>
        </li>
    );
}

export default Task;
