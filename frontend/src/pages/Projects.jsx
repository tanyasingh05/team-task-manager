import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {

  document.title = "Projects";

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/projects", {
        headers: {
          authorization: token
        }
      });

      setProjects(response.data);

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
        Projects
      </h1>

      {projects.map((project) => (
        <div
          key={project._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center"
          }}
        >
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}

    </div>
  );
}

export default Projects;