import Task from './Task';
import { useEffect, useMemo, useState } from 'react';
import TaskInput from './TaskInput';

const tasksData = [
    { id: 1, text: 'Take out trash', isCompleted: false },
    { id: 2, text: 'Do laundry', isCompleted: false },
    { id: 3, text: 'Grocery shopping', isCompleted: true },
    { id: 4, text: 'Clean bathroom', isCompleted: false },
];

function TaskList({ user, token }) {
    useEffect(() => {
        if (user !== null) {
            fetchTasks().then((tasks) => setTasks(tasks));
        }

        async function fetchTasks() {
            const res = await fetch(`http://localhost:3001/users/${user.id}`);
            const data = await res.json();
            console.log(data);
            return data.user.tasks;
        }
    }, [user]);

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
            {user && <h1>{user.username}'s Tasks</h1>}
            <ul>
                {memoizedOrderedTasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        setTasks={setTasks}
                        token={token}
                        user={user}
                    />
                ))}
            </ul>
            <TaskInput setTasks={setTasks} token={token} user={user} />
        </section>
    );
}

export default TaskList;
