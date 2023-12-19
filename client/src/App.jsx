import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const navigate = useNavigate();

  const inputProps = {
    padding: "8px",
    borderRadius: "10px",
    margin: "0.2rem",
  };
  const [selectedBatch, setSelectedBatch] = useState("");

  //current-user & payment-status
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("user-data")) {
        navigate("/login");
      }
      setCurrentUser(await JSON.parse(localStorage.getItem("user-data")));
      setPaymentStatus(currentUser.paymentStatus);
    };
    getCurrentUser();
  });

  //PaymentUpdate
  const handlePaymentUpdate = async (event) => {
    event.preventDefault();

    const updationStats = await axios.patch(
      "http://localhost:5000/api/auth/update",
      {
        email: currentUser.email,
        paymentStatus: true,
      }
    );
    console.log(updationStats);

    const tempUser = await JSON.parse(localStorage.getItem("user-data"));
    tempUser.paymentStatus = true;

    localStorage.setItem("user-data", JSON.stringify(tempUser));
    setPaymentStatus(true);
  };

  //Logout
  const handleLogOut = async () => {
    localStorage.removeItem("user-data");
    setCurrentUser(undefined);
    navigate("/login");
  };

  //BatchUpdate
  const handleBatchUpdate = async () => {
    const user = await axios.get(
      `http://localhost:5000/api/auth/status/${currentUser._id}`
    );

    let userDate = user.data.updatedDate.substr(0, 10);
    let arr = userDate.split("-");

    //
    let currentDate = new Date();
    let year = currentDate.getFullYear().toString();
    let month = (currentDate.getMonth() + 1).toString();
    let day = currentDate.getDate().toString();

    //
    console.log(month, day, year);

    if (arr[1] === month) {
      toast.error("You cannot change the batch in same month");
      return;
    }
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
      <button onClick={handleBatchUpdate}>Update Batch</button>
      <div>
        <div>
          Payment Status: {paymentStatus === false ? "Not Paid" : "Paid"}
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
      <ToastContainer />
    </>
  );
}

export default App;
