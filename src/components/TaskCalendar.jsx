import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TaskCalendar = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filtrar tareas por la fecha seleccionada
  const tasksForDate = tasks.filter(
    (task) => task.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="calendar-container">
      <h2>Calendario</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) =>
          tasks.some((task) => task.date === date.toISOString().split("T")[0]) ? "highlight" : ""
        }
      />
      
      <div className="task-list">
        <h3>Tareas para {selectedDate.toDateString()}</h3>
        {tasksForDate.length === 0 ? (
          <p>No hay tareas para esta fecha.</p>
        ) : (
          <ul>
            {tasksForDate.map((task) => (
              <li key={task.id}>{task.text} ({task.category})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
