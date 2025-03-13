require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let tasks = []; // Aquí se almacenarán temporalmente las tareas

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Error con SMTP:", error);
  } else {
    console.log("Servidor SMTP listo para enviar correos");
  }
});

// Ruta para agregar una tarea y enviar correo inmediatamente
app.post("/add-task", (req, res) => {
  const { id, text, date, email } = req.body;

  // Guardar la tarea en la lista
  tasks.push({ id, text, date, email });

  // Configurar opciones del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Nueva tarea registrada",
    text: `Has registrado una nueva tarea: "${text}" para la fecha ${date}.`,
  };

  // Enviar correo de inmediato
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar correo:", error);
      return res.status(500).json({ message: "Error al enviar el correo" });
    } else {
      console.log("Correo enviado:", info.response);
      return res.status(201).json({ message: "Tarea guardada y correo enviado" });
    }
  });
});

// Función para verificar y enviar correos en la fecha de la tarea (manteniendo el cron job)
const checkTasksAndSendEmails = () => {
  const today = new Date().toISOString().split("T")[0];

  tasks.forEach((task) => {
    if (task.date === today) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: task.email,
        subject: "Recordatorio de Tarea",
        text: `Tienes una tarea pendiente para hoy: "${task.text}". ¡No olvides completarla!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error al enviar correo:", error);
        } else {
          console.log("Correo enviado:", info.response);
        }
      });
    }
  });
};

// Programar la verificación todos los días a las 8 AM
cron.schedule("0 8 * * *", checkTasksAndSendEmails);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));