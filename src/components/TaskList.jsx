import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, editTask, toggleComplete }) => {
  return (
    <div>
      {tasks.length === 0 && <p>No hay tareas pendientes.</p>}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
