import '../styles/Task.css';

function Task({ task }) {
    return (
        <article className="task">
            <button className="complete-task-btn"></button>
            {task.text}
        </article>
    );
}

export default Task;
