import React, { useState } from "react";
import Today from "../shared/Table/Today";
import Upcoming from "../shared/Table/Upcoming";
import Completed from "../shared/Table/Completed";
import Total from "../shared/Table/Total";
import Add from "../assets/Add.svg";
import { AppProvider } from "../AppContext";
import AddAppointment from "../components/AddAppointment/AddAppointment";
import NewAppointment from "../components/NewAppointment/NewAppointment.js";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Home.css";
const closeIcon = (
  <svg
    width="29"
    height="29"
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

function Home() {
  const [activeTab, setActiveTab] = useState("today");

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  function handleCloseModal(data) {
    setOpen(data);
  }

  return (
    <AppProvider>
      <div className="flex  justify-evenly my-5 items-center">
        <h1>Appointment</h1>
        <button
          className="flex  items-center justify-center gap-2 border p-3 text-center text-[#93e4f8] text-inter text=[12px] font-[600] rounded-[3px]"
          onClick={onOpenModal}
        >
          <img className="  w-3 " src={Add} alt="add"></img>
          <div>Appointment</div>
        </button>
        <button
          onClick={onOpenModal}
          className="bg-[#f8f8f8] px-[11px] py-[8px] text-[#5B76FC] font-[600] shadow-md rounded-[4px]"
        >
          + Appointment
        </button>
        <button
          // onClick={onOpenModal2}
          onClick={onOpenModal}
          className="bg-[#ffffff] px-[11px] py-[8px] text-[#64d6f2] font-[600] shadow-md rounded-[4px]"
        >
          + Appointment
        </button>
      </div>

      <div className="flex  flex-col  md:justify-center  md:flex-row ">
        <div className="relative">
          <button
            className={`border-r p-3 ${
              activeTab === "today"
                ? "border-gray-300  bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
                : ""
            } md:h-[50px] md:w-[100px] md:p-0`}
            style={
              activeTab === "today"
                ? {
                    borderWidth: "0.5px",
                    color: "#346AFF",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <p
            className={`absolute top-1  font-[500]  right-2 text-[12px] ${
              activeTab === "today" ? "text-[#346AFF] " : ""
            } `}
          >
            10
          </p>
        </div>

        <div className="relative">
          <button
            className={`border-r  p-3  ${
              activeTab === "upcoming"
                ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
                : ""
            } md:h-[50px] md:w-[120px]`}
            style={
              activeTab === "upcoming"
                ? {
                    borderWidth: "0.5px",
                    color: "#346AFF",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <p
            className={`absolute top-1  font-[500]  right-2 text-[12px] ${
              activeTab === "upcoming" ? "text-[#346AFF] " : ""
            } `}
          >
            10
          </p>
        </div>
        <div className="relative">
          <button
            className={`border-r p-3 ${
              activeTab === "completed"
                ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
                : ""
            } md:h-[50px] md:w-[130px]`}
            style={
              activeTab === "completed"
                ? {
                    borderWidth: "0.5px",
                    color: "#346AFF",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
          <p
            className={`absolute top-1  font-[500]  right-2 text-[12px] ${
              activeTab === "completed" ? "text-[#346AFF] " : ""
            } `}
          >
            10
          </p>
        </div>
        <div className="relative">
          <button
            className={`border-r p-3 ${
              activeTab === "total"
                ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
                : ""
            } md:h-[50px] md:w-[100px]`}
            style={
              activeTab === "total"
                ? {
                    borderWidth: "0.5px",
                    color: "#346AFF",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("total")}
          >
            Total
          </button>
          <p
            className={`absolute top-1  font-[500]  right-2 text-[12px] ${
              activeTab === "total" ? "text-[#346AFF] " : ""
            } `}
          >
            10
          </p>
        </div>
      </div>
      <div className="mt-[50px]">
        <div>
          {activeTab === "today" && <Today />}
          {activeTab === "upcoming" && <Upcoming />}
          {activeTab === "completed" && <Completed />}
          {activeTab === "total" && <Total />}
        </div>
      </div>

      <div>
        <Modal
          open={open2}
          onClose={onCloseModal2}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <NewAppointment />
        </Modal>
      </div>
      <div>
        <Modal
          open={open}
          onClose={onCloseModal}
          closeIcon={closeIcon}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <AddAppointment handleCloseModal={handleCloseModal} />
        </Modal>
      </div>
    </AppProvider>
  );
}

export default Home;
