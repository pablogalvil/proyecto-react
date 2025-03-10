import { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex gap-2">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="text-input"
        placeholder="Nueva tarea"
      />
      <button type="submit" className="btn-add">
        Añadir
      </button>
    </form>
  );
};

export default TaskForm;
