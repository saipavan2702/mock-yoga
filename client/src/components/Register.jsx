import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const url = "http://localhost:5000/api/auth/register";
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/profile");
    }
  });
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
  });

  const [selectedBatch, setSelectedBatch] = useState("");
  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const inputProps = {
    padding: "8px",
    borderRadius: "10px",
    margin: "0.2rem",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (info.age < 18 || info.age > 65) {
      setInfo({ ...info, [info.age]: "" });
      toast.error("Please enter valid age");
      return;
    }

    const user = await axios.post(url, {
      firstname: info.firstname,
      lastname: info.lastname,
      email: info.email,
      password: info.password,
      age: info.age,
      batch: selectedBatch,
      paymentStatus: false,
    });

    if (user.data.status) {
      toast.error("User already exists");
    }

    if (user.data) {
      localStorage.setItem("user-data", JSON.stringify(user.data));
      navigate("/profile");
    }
  };

  return (
    <div className="container">
      <form className="login" onSubmit={handleSubmit}>
        <div>
          <input
            style={inputProps}
            type="text"
            name="firstname"
            placeholder="Enter your first name"
            onChange={(event) => handleChange(event)}
          />
          <input
            style={inputProps}
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            onChange={(event) => handleChange(event)}
          />
        </div>
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
          placeholder="Enter your password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          style={inputProps}
          type="number"
          name="age"
          placeholder="Enter your age"
          onChange={(event) => handleChange(event)}
        />
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          style={inputProps}
        >
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
        <button type="submit">Register</button>

        <span>
          already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
