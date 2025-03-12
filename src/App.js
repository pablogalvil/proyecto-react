import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CategoryBar from "./components/CategoryBar";
import TaskCalendar from "./components/TaskCalendar"; // Importamos el nuevo componente
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories] = useState(["Trabajo", "Estudio", "Personal"]); // Lista de categorías
  const [selectedCategory, setSelectedCategory] = useState("all"); // Categoría seleccionada

  const addTask = (task, category, date) => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false, category, date }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Filtrar tareas según la categoría seleccionada
  const filteredTasks = selectedCategory === "all" ? tasks : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="app-container">
      {/* Sección de Tareas */}
      <div className="task-section">
        <h1>Gestor de tareas</h1>
        <CategoryBar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <TaskForm addTask={addTask} categories={categories} />
        <TaskList tasks={filteredTasks} deleteTask={deleteTask} editTask={editTask} toggleComplete={toggleComplete} />
      </div>

      {/* Sección del Calendario */}
      <div className="calendar-section">
        <TaskCalendar tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
