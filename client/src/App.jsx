import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const navigate = useNavigate();

  const inputProps = {
    padding: "8px",
    borderRadius: "10px",
    margin: "0.2rem",
  };
  const [selectedBatch, setSelectedBatch] = useState("");
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("user-data")) {
        navigate("/login");
      }
      setCurrentUser(await JSON.parse(localStorage.getItem("user-data")));
    };
    getCurrentUser();
  });

  useEffect(() => {
    const getPaymentStatus = async () => {
      const user = await axios.get(
        `http://localhost:5000/api/auth/status/:${currentUser._id}`
      );

      setPaymentStatus(user.data.paymentStatus);
    };
    getPaymentStatus();
  }, [currentUser]);

  const handlePaymentUpdate = async (event) => {
    event.preventDefault();
    if (currentUser.paymentStatus === true) {
      return;
    }
    const user = await axios.patch("http://localhost:5000/api/auth/update", {
      email: currentUser.email,
      paymentStatus: true,
    });
    console.log(user);
    setPaymentStatus(user.data.paymentStatus);
  };

  const handleLogOut = async () => {
    localStorage.removeItem("user-data");
    navigate("/login");
  };

  return (
    <>
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
      <button>Update Batch</button>
      <div>
        <div>
          Payment Status: {paymentStatus === false ? "Not Paid" : "Paid"}{" "}
        </div>
        {paymentStatus === false ? (
          <button onClick={handlePaymentUpdate}>Pay now</button>
        ) : (
          <span>Fee Paid</span>
        )}
      </div>
      <div>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </>
  );
}

export default App;
