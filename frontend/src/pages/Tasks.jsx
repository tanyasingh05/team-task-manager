import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks() {

  document.title = "Tasks";

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        headers: {
          authorization: token
        }
      });

      setTasks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white"
      }}
    >

      <button
        onClick={() => window.location.href = "/dashboard"}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        Back
      </button>

      <h1
        style={{
          textAlign: "center",
          fontSize: "60px"
        }}
      >
        Tasks
      </h1>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center"
          }}
        >
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}

    </div>
  );
}

export default Tasks;