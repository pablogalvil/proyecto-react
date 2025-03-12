import { useState } from "react";

const TaskForm = ({ addTask, categories }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState(categories[0]); // Primera categoría por defecto
  const [date, setDate] = useState(""); // Estado para la fecha

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && date) {
      // Convertimos la fecha a formato local (YYYY-MM-DD)
      const localDate = new Date(date);
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());

      addTask(task, category, localDate.toISOString().split("T")[0]); // Guardamos en formato local
      setTask("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input"
        placeholder="Nueva tarea"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-select"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="task-date"
      />

      <button type="submit" className="task-btn">
        Añadir
      </button>
    </form>
  );
};

export default TaskForm;
