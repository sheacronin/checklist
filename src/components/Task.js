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

    return (
        <article className={task.isCompleted ? 'task completed-task' : 'task'}>
            <button
                className="complete-task-btn"
                onClick={markTaskAsCompleted}
            ></button>
            {task.text}
        </article>
    );
}

export default Task;
