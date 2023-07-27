import React, { useState, useContext } from "react";
import user from "../../assets/user.svg";
import phone from "../../assets/phone.svg";
import mail from "../../assets/mail.svg";
import calender from "../../assets/calender.svg";
import time from "../../assets/time.svg";
import axios from "axios";
import { AppContext } from "../../AppContext";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import sucessGreen from "../../assets/sucess-green.svg";
import "./CalenderModal.css";
import Simple from "../../shared/Calender/Sample";
import Detail from "../../shared/AppointmentDetail/Detail";
const closeIcon = (
  <svg
    width="26"
    height="26"
    viewBox="2 9 20 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.3331 21.3331L15.9999 15.9999M15.9999 15.9999L10.6665 10.6665M15.9999 15.9999L21.3332 10.6665M15.9999 15.9999L10.6665 21.3332"
      stroke="black"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const closeIcon2 = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6666 11.6666L6.33335 6.33335M6.33335 6.33335L1 1M6.33335 6.33335L11.6667 1M6.33335 6.33335L1 11.6667"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
function AddAppointment(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "",
    contact: "",
    time: "",
    date: "",
    duration: "30 Min",
    status: "Pending",
    color: "yellow",
    reminder: "Notify",
    notified: false,
    reschedule: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    services: "",
    contact: "",
    time: "",
    date: "",
  });
  const { setShowModal, ShowModal } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [openSucess, setOpenSucess] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const onOpenSucess = () => {
    if (validateForm()) {
      setOpenSucess(true);
    }
  };
  const onCloseSucess = () => setOpenSucess(false);

  const validateForm = () => {
    let isValid = true;

    if (!formData.name) {
      setFormErrors((prevData) => ({
        ...prevData,
        name: "Required",
      }));
      isValid = false;
    } else if (formData.name.length < 8) {
      setFormErrors((prevData) => ({
        ...prevData,
        name: "Minimum 8 letters",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (!formData.email) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Required",
      }));
      isValid = false;
    } else {
      const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

      if (!emailRegex.test(formData.email)) {
        setFormErrors((prevState) => ({
          ...prevState,
          email: "Invalid",
        }));

        isValid = false;
      } else {
        setFormErrors((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }
    if (!formData.contact) {
      setFormErrors((prevState) => ({
        ...prevState,
        contact: " Required",
      }));
      isValid = false;
    } else if (!/^[0-9]{10}$/i.test(formData.contact)) {
      setFormErrors((prevState) => ({
        ...prevState,
        contact: "Invalid",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        contact: "",
      }));
    }
    if (!formData.services) {
      setFormErrors((prevData) => ({
        ...prevData,
        services: "Select a Service",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        services: "",
      }));
    }

    if (!formData.date) {
      setFormErrors((prevData) => ({
        ...prevData,
        date: "Select a Date",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        date: "",
      }));
    }
    if (!formData.time) {
      setFormErrors((prevData) => ({
        ...prevData,
        time: "Select a Time",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        time: "",
      }));
    }

    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If the form is valid, proceed with form submission
      const data = true;
      setShowModal(data);
      props.handleCloseModal(!data);

      axios
        .post("http://localhost:3030/Today", formData)
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            services: "",
            contact: "",
            time: "",
            date: "",
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
  };
  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setFormData((prevState) => ({
      ...prevState,
      contact: sanitizedValue,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      contact: "",
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));

    if (name === "services") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      let dynamicTime = "30 Min";
      if (value === "Banana") {
        dynamicTime = "45 Min";
      } else if (value === "Orange") {
        dynamicTime = "55 Min";
      }

      setFormData((prevState) => ({
        ...prevState,
        time: "",
        duration: dynamicTime,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSelectedDate = (selectedDate) => {
    // Callback function to set the selected date in the formData state
    setFormData((prevState) => ({
      ...prevState,
      date: selectedDate, // Update the "date" field with the selected date
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      date: "",
    }));

    setOpen(false);
  };
  // const generateTimeOptions = () => {
  //   const startTime = 6; // 6 am
  //   const endTime = 18; // 6 pm

  //   const options = [];
  //   for (let hour = startTime; hour <= endTime; hour++) {
  //     const timeLabel = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
  //     options.push(
  //       <option key={timeLabel} value={timeLabel}>
  //         {timeLabel}
  //       </option>
  //     );
  //   }
  //   return options;
  // };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className=" flex md:w-[400px] md:h-[auto] mt-4  flex-col bg-[#F5F5FA]"
        >
          <h1 className="text-center mb-3 text-[18px] font-[600]">
            Appointment
          </h1>
          <div className="flex items-center relative mx-3">
            <img className="w-3.5  absolute left-4" src={user} alt="user"></img>
            <input
              className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] m-2 pl-[26px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[15px] md:pl-[35px]`}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            {formErrors.name && (
              <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
                {formErrors.name}*
              </p>
            )}
          </div>
          <div className="flex  items-center relative mx-3">
            <img className="w-4 absolute left-4" src={mail} alt="mail"></img>
            <input
              className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] m-2 pl-[26px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[15px] md:pl-[35px]`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {formErrors.email && (
              <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
                {formErrors.email}*
              </p>
            )}
          </div>
          <div className="flex items-center relative mx-3">
            <img
              className="w-4 h-4 absolute left-4"
              src={phone}
              alt="phone"
            ></img>
            <input
              className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] m-2 pl-[26px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[15px] md:pl-[35px]`}
              type="phone"
              name="contact"
              placeholder="Phone No"
              value={formData.contact}
              onChange={handlePhoneNumberChange}
              required
            />
            {formErrors.contact && (
              <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
                {formErrors.contact}*
              </p>
            )}
          </div>
          {/* SERVICE */}
          <div className="flex flex-col  md:flex-row md:gap-2.5">
            <div className="ml-3 relative">
              <select
                onChange={handleChange}
                name="services"
                className="rounded-[5px] border-none m-2 mr-11 text-[14px] text-[#8B8989] h-[39px] md:m-2 pl-[14px] border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[240px] md:h-[45px] md:pl-[15px]  md:text-[15px]"
              >
                <option value="">Select a Service</option>
                <option value="Legal Consultant">Legal Consultant</option>
                <option value="Banana">Banana</option>
                <option value="Orange">Orange</option>
              </select>
              {formErrors.services && (
                <p className="text-red-500  absolute top-1 right-0 text-[10px] mx-3 mt-1">
                  {formErrors.services}*
                </p>
              )}
            </div>
            {formData.services && (
              <div className="ml-3 ">
                <button
                  type="button"
                  className="text-[14px] h-[39px] border-none  text-[#ad80d8] w-[80px] rounded-[5px]  m-2  border-[0.5px] outline-none active:outline-none  focus:outline-none  bg-[#dceaff4d] shadow-shado2   md:w-[80px] md:h-[45px]  md:text-[15px] "
                >
                  {formData.duration}
                </button>
              </div>
            )}
          </div>
          <div className="  mx-3 flex  flex-col md:justify-start md:items-center md:gap-5 md:flex-row ">
            <div className=" relative w-[100px] md:w-auto ">
              <img
                className=" hidden md:block md:w-4 left-2 absolute md:left-4 top-[1.40rem]"
                src={calender}
                alt="calender"
              ></img>
              <button
                onClick={onOpenModal}
                type="button"
                className="  text-[14px] border-none h-[39px]  w-full rounded-[5px]  text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[140px] md:h-[45px]  md:text-[15px] "
              >
                {formData.date === "" ? (
                  <p>Select Date</p>
                ) : (
                  <p className="pl-3">{formData.date}</p>
                )}
              </button>
              {formErrors.date && (
                <p className="text-red-500 text-[12px] mx-3 ">
                  {formErrors.date}*
                </p>
              )}
            </div>
            {/* <div className=" relative w-[100px] md:w-auto ">
             

              <button
                type="button"
                className="  text-[14px] h-[39px]  w-full rounded-[5px]  text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[140px] md:h-[45px] md:text-[15px]   "
              >
                Select Time
              </button>
            </div> */}
            <div className=" relative w-[100px] md:w-auto ">
              <img
                className=" hidden md:block  md:w-4 left-2 absolute md:left-4 top-[1.40rem]"
                src={time}
                alt="time"
              ></img>
              <select
                onChange={handleChange}
                name="time" // Updated from "services" to "time"
                className="rounded-[5px] border-none m-2 mr-11 text-[14px] text-[#8B8989] h-[39px] md:m-2 pl-[17px] border-[0.5px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 bg-[#dceaff4d] shadow-shado2 md:w-[150px] md:h-[45px] md:pl-[30px] md:text-[15px]"
                value={formData.time}
              >
                <option value="">Select Time</option>
                {/* {generateTimeOptions} */}

                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
              </select>
              {formErrors.time && (
                <p className="text-red-500 text-[12px] mx-3 ">
                  {formErrors.time}*
                </p>
              )}
            </div>
          </div>
          <div
            className={` text-center mt-2 ${
              (formData.time && formData.date) === "" ? "hidden" : null
            } `}
          >
            <p>
              Appointment is set to {formData.time}, {formData.date}
            </p>
          </div>
          <div className="flex justify-center items-center mt-5 mb-5">
            <button
              type="button"
              onClick={onOpenSucess}
              className="bg-[#0AA1DD] text-[white] font-[600] font-inter p-4 rounded-[5px] flex justify-center  items-center text-[14px] h-[39px] "
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Submit
            </button>
          </div>

          <Modal
            classNames={{
              modal: "customModalSucess",
            }}
            open={openSucess}
            onClose={onCloseSucess}
            center
            closeIcon={closeIcon2}
          >
            <div className="h-[55px] flex flex-col justify-center items-center bg-[#A2DC77]">
              <p className=" text-[white] w-full text-center text-[17px] font-[600] tracking-wide font-inter">
                Sucess
              </p>
              <div className=" w-full relative">
                <img
                  src={sucessGreen}
                  className="w-[30px] h-[30px] absolute bottom-[-30px]  left-1/2 transform -translate-x-1/2"
                  alt=""
                />
              </div>
            </div>

            <Detail data={formData} />
            <div className=" font-roboto mb-3 gap-[90px]  flex justify-evenly">
              <button
                type="button"
                onClick={onCloseSucess}
                className="border-none text-white bg-[#A2DC77] hover:bg-[#8ed35a] rounded-md"
                style={{
                  padding: "8px 17px 10px 18px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}
              >
                Edit
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="border-none  text-[#4a4a4a] rounded-md bg-[#e9edf5] hover:bg-[#e2e9f7] "
                style={{
                  padding: "8px 17px 10px 18px",

                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                }}
              >
                Submit
              </button>
            </div>
          </Modal>
        </form>

        <Modal
          classNames={{
            modal: "customModalCalender",
          }}
          open={open}
          onClose={onCloseModal}
          center
          closeIcon={closeIcon}
        >
          <Simple onSelectDate={handleSelectedDate} />
          {/* <Calendar onSelectDate={handleSelectedDate} /> */}
        </Modal>
      </div>
    </>
  );
}

export default AddAppointment;
