import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TaskCalendar = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Estado para animación
  const [animateCalendar, setAnimateCalendar] = useState(false); 

  useEffect(() => {
    setTimeout(() => {
      setAnimateCalendar(true);
    }, 100);
  }, []);

  const tasksForDate = tasks.filter(
    (task) => task.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className={`calendar-container ${animateCalendar ? "animate-calendar" : ""}`}>
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
              <li key={task.id}>
                {task.text} ({task.category})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskCalendar;
