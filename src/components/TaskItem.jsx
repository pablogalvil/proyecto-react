import { useState, useRef } from "react";
import deleteSound from "../assets/delete.wav";

const TaskItem = ({ task, deleteTask, editTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description || "");

  // Una sola referencia para el audio
  const audioRef = useRef(new Audio(deleteSound));

  const handleEdit = () => {
    editTask(task.id, newText, newDescription);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    audioRef.current.play();
  };

  return (
    <div className="border rounded px-3 py-2 my-2 flex items-center justify-between">
      {isEditing ? (
        <>
          <div className="flex-1">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border rounded px-2 py-1 w-full my-1"
              placeholder="Descripción"
            />
          </div>
          <button onClick={handleEdit} className="btn-edit">
            Guardar
          </button>
        </>
      ) : (
        <>
          <div className="flex-1">
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            {task.description && (
              <p className="text-sm text-gray-600">{task.description}</p>
            )}
            <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
              {task.category}
            </span>
          </div>

          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Editar
          </button>
          <button onClick={handleDelete} className="btn-delete">
            Eliminar
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
