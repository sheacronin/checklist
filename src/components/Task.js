import '../styles/Task.css';

function Task({ task, setTasks }) {
    function markTaskAsCompleted() {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            const i = newTasks.indexOf(task);
            const taskToChange = { ...newTasks[i] };
            taskToChange.isCompleted = !taskToChange.isCompleted;
            newTasks[i] = taskToChange;
            return newTasks;
        });
    }

    function deleteTask() {
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            const i = newTasks.indexOf(task);
            newTasks.splice(i, 1);
            return newTasks;
        });
    }

    return (
        <li className={task.isCompleted ? 'task completed-task' : 'task'}>
            <button
                className="complete-task-btn"
                onClick={markTaskAsCompleted}
            ></button>
            {task.text}
            <button className="delete-task-btn" onClick={deleteTask}></button>
        </li>
    );
}

export default Task;
