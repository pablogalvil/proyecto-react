import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CategoryBar from "./components/CategoryBar";
import TaskCalendar from "./components/TaskCalendar";
import darkIcon from "./assets/dark-mode.png";
import lightIcon from "./assets/light-mode.png";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [categories] = useState(["Trabajo", "Estudio", "Personal"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (task, description, category, date) => {
    const newTask = { 
      id: Date.now(), 
      text: task,
      description,
      completed: false, 
      category, 
      date, 
      email: prompt("Ingresa tu correo:")
    };
  
    setTasks([...tasks, newTask]);
  
    try {
      const response = await fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error al guardar la tarea en el backend:", error);
    }
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

  const filteredTasks = selectedCategory === "all" ? tasks : tasks.filter((task) => task.category === selectedCategory);

  // Este useEffect soluciona correctamente tu problema del modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Limpiar la clase al desmontar
    return () => document.body.classList.remove('dark-mode');
  }, [darkMode]);

  return (
    <div className="app-container">
      <button className="darkmode-btn" onClick={() => setDarkMode(!darkMode)}>
        <img 
          src={darkMode ? lightIcon : darkIcon} 
          alt="Modo Oscuro" 
        />
      </button>

      <div className="task-section">
        <h1>Gestor de tareas</h1>
        <CategoryBar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <TaskForm addTask={addTask} categories={categories} />
        <TaskList tasks={filteredTasks} deleteTask={deleteTask} editTask={editTask} toggleComplete={toggleComplete} />
      </div>

      <div className="calendar-section">
        <TaskCalendar tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
