import '../styles/TaskInput.css';

function TaskInput() {
    return (
        <section className="task-input">
            <form>
                <label htmlFor="task-text">New Task:</label>
                <div className="input-and-btn">
                    <input type="text" name="task-text" id="task-text" />
                    <button type="submit">Submit Task</button>
                </div>
            </form>
        </section>
    );
}

export default TaskInput;
