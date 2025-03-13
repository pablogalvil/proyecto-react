import { useState, useRef } from "react";
import successSound from "../assets/success.wav"; // Importa tu archivo de sonido

const TaskForm = ({ addTask, categories }) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  
  // Referencia para el sonido
  const audioRef = useRef(new Audio(successSound));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && date) {
      const localDate = new Date(date);
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());

      addTask(task, description, category, localDate.toISOString().split("T")[0]);
      setTask("");
      setDescription("");
      setDate("");

      // Reproducir sonido al añadir tarea
      audioRef.current.play();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-left">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
          placeholder="Nueva tarea"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-input textarea-description"
          placeholder="Descripción (opcional)"
        />
      </div>

      <div className="form-right">
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
      </div>
    </form>
  );
};

export default TaskForm;
