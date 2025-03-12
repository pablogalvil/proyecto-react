import { useState } from "react";

const TaskItem = ({ task, deleteTask, editTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="border rounded px-3 py-2 my-2 flex items-center justify-between">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
          <button onClick={handleEdit} className="bg-green-500 text-white px-2 py-1 rounded ml-2">
            Guardar
          </button>
        </>
      ) : (
        <>
          <div className="flex-1">
            <span
              className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>
            <span className="ml-2 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
              {task.category} {/* ✅ Muestra la categoría de la tarea */}
            </span>
          </div>
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Editar
          </button>
          <button onClick={() => deleteTask(task.id)} className="btn-delete">
            Eliminar
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
