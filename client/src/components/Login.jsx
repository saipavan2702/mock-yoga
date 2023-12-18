import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const url = "http://localhost:5000/api/auth/login";
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const inputProps = {
    padding: "8px",
    borderRadius: "10px",
    margin: "0.2rem",
  };

  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = axios.post(url, {
      email: info.email,
      password: info.password,
    });

    if (user.data.status === false) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <form className="login" onSubmit={handleSubmit}>
        <input
          style={inputProps}
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          style={inputProps}
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Log me In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
