import Task from './Task';
import '../styles/TaskList.css';

const tasks = [
    { id: 1, text: 'Take out trash', completed: false },
    { id: 2, text: 'Do laundry', completed: false },
    { id: 3, text: 'Grocery shopping', completed: true },
    { id: 4, text: 'Clean bathroom', completed: false },
];

function TaskList() {
    return (
        <section className="task-list">
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </section>
    );
}

export default TaskList;
