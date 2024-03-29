import { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL } from '../constants';
import Task from './Task';
import TaskInput from './TaskInput';

function TaskList({ user }) {
    useEffect(() => {
        if (user !== null) {
            fetchTasks().then((tasks) => setTasks(tasks));
        }

        async function fetchTasks() {
            const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                credentials: 'include',
            });
            const data = await res.json();
            return data.user.tasks;
        }
    }, [user]);

    const [tasks, setTasks] = useState([]);

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
            {user && <h2>{user.username}'s tasks</h2>}
            <ul>
                {memoizedOrderedTasks.map((task) => (
                    <Task
                        key={task._id}
                        task={task}
                        setTasks={setTasks}
                        user={user}
                    />
                ))}
            </ul>
            <TaskInput setTasks={setTasks} user={user} />
        </section>
    );
}

export default TaskList;
