import React, { useState, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import user from "../../assets/user.svg";
import phone from "../../assets/phone.svg";
import mail from "../../assets/mail.svg";

import axios from "axios";
import { AppContext } from "../../AppContext";
import "./NewAppointment.css";
import "react-responsive-modal/styles.css";

function AddAppointment(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "",
    contact: "",
    time: "6:00 AM",
    date: "2022/12/28",
    duration: "30 Min",
    status: "Pending",
    color: "yellow",
    reminder: "NOTIFY",
    notified: false,
    reschedule: false,
  });
  const { setShowModal, ShowModal } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    const data = true;
    props.onUpdateParentState(data);

    axios
      .post("http://localhost:3030/Today", formData)
      .then((res) => {
        setFormData({
          name: "",
          email: "",
          services: "",
          contact: "",
          time: "6:00 AM",
          date: "2022/12/28",
          duration: "30 Min",
          status: "Pending",
          color: "yellow",
          reminder: "NOTIFY",
          notified: false,
          reschedule: false,
        });
        setShowModal(!ShowModal);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className=" form flex md:w-[400px] md:h-[500px] flex-col "
        >
          <h1 className="text-center my-4">Appointment</h1>
          <Box sx={{ position: "relative", mx: 3 }} className="mb-2.5">
            <img
              className="w-3.5 absolute top-3 right-3"
              src={user}
              alt="user"
            ></img>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Box>
          <Box sx={{ position: "relative", mx: 3 }} className="mb-2.5">
            <img
              className="w-4 absolute top-3.5 right-3"
              src={mail}
              alt="mail"
            ></img>
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Box>
          <Box
            sx={{ position: "relative", mx: 3 }}
            className="mb-2.5   md:h-auto"
          >
            <img
              className="w-4 h-4 absolute  top-3 right-3"
              src={phone}
              alt="phone"
            ></img>
            <TextField
              fullWidth
              size="small"
              label="Phone No"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </Box>
          <div className="ml-4">
            <select
              onChange={handleChange}
              name="services"
              className=" rounded-[5px] mx-2 mr-11 text-[14px] text-[#8B8989] h-[39px] mt-1 pl-[14px] border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[200px] md:h-[45px] md:pl-[6px]  md:text-[15px]  "
            >
              <option value="">Select a Service</option>
              <option value="LegalConsultant">Legal Consultant</option>
              <option value="Banana">Banana</option>
              <option value="Orange">Orange</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 5 }}
          >
            Submit
          </Button>
        </form>
        {/* ... */}
      </div>
    </>
  );
}

export default AddAppointment;
