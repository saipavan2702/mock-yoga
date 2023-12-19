import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const url = "http://localhost:5000/api/auth/login";
  const navigate = useNavigate();
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await axios.post(url, {
      email: info.email,
      password: info.password,
    });
    console.log(user);

    if (user.data.status === false) {
      toast.error(user.data.msg);
      return;
    }

    console.log(user.data);
    localStorage.setItem("user-data", JSON.stringify(user.data));
    navigate("/profile");
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
        <span>
          Dont have an account?
          <Link to="/">Sign up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
