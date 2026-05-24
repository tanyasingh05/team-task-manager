import { Link } from "react-router-dom";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <div style={{
      padding: "30px"
    }}>

      <h1>
        Welcome {user?.name}
      </h1>

      <p>
        Role: {user?.role}
      </p>

      <div style={{
        marginTop: "20px",
        display: "flex",
        gap: "20px"
      }}>

        <Link to="/projects">
          <button>
            Projects
          </button>
        </Link>

        <Link to="/tasks">
          <button>
            Tasks
          </button>
        </Link>

        <button
          onClick={() => {

            localStorage.clear();

            window.location.href = "/";

          }}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Dashboard;