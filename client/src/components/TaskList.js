import Task from './Task';
import '../styles/TaskList.css';
import { useMemo, useState } from 'react';
import TaskInput from './TaskInput';

const tasksData = [
    { id: 1, text: 'Take out trash', isCompleted: false },
    { id: 2, text: 'Do laundry', isCompleted: false },
    { id: 3, text: 'Grocery shopping', isCompleted: true },
    { id: 4, text: 'Clean bathroom', isCompleted: false },
];

function TaskList() {
    const [tasks, setTasks] = useState(tasksData);

    function orderTasks(tasks) {
        const alphabeticalTasks = orderTasksAlphabetically();

        // Separate completed tasks.
        const incompleteTasks = alphabeticalTasks.filter(
            (task) => !task.isCompleted
        );
        const completedTasks = alphabeticalTasks.filter(
            (task) => task.isCompleted
        );

        return [...incompleteTasks, ...completedTasks];

        function orderTasksAlphabetically() {
            return tasks.sort((a, b) => {
                if (a.text > b.text) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
    }

    const memoizedOrderedTasks = useMemo(() => orderTasks(tasks), [tasks]);

    return (
        <section className="task-list">
            <ul>
                {memoizedOrderedTasks.map((task) => (
                    <Task key={task.id} task={task} setTasks={setTasks} />
                ))}
            </ul>
            <TaskInput setTasks={setTasks} />
        </section>
    );
}

export default TaskList;
