import React, { useState } from "react";
import Today from "../../shared/Table/Today";
import Upcoming from "../../shared/Table/Upcoming";
import Completed from "../../shared/Table/Completed";
import Total from "../../shared/Table/Total";
import Add from "../../assets/Add.svg";
import { AppProvider } from "../../AppContext";
import AddAppointment from "../../components/AddAppointment/AddAppointment";

export default function Offer() {
  const [activeTab, setActiveTab] = useState("today");
  const [portal, setPortal] = useState(true);

  const togglePortal = () => {
    setPortal(!portal);
  };

  const childData = (data) => {
    setPortal(data);
  };

  return (
    <AppProvider>
      <div className="flex  justify-evenly my-5 items-center">
        <h1>Appointment</h1>
        <button
          className="flex items-center justify-center gap-2 border p-3 text-center text-[#93e4f8] text-inter text=[12px] font-[600] rounded-[3px]"
          onClick={togglePortal}
        >
          <img className="  w-3 " src={Add} alt="add"></img>
          <div>Appointment</div>
        </button>
      </div>

      <div className="flex justify-center ">
        <button
          className={`border-r ${
            activeTab === "today"
              ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
              : ""
          } md:h-[50px] md:w-[100px]`}
          style={
            activeTab === "today"
              ? {
                  color: "#346AFF",
                  borderWidth: "0.5px",
                  boxShadow: "0px 2px 5px 0px #D2F3FA",
                }
              : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
          }
          onClick={() => setActiveTab("today")}
        >
          Today
        </button>

        <button
          className={`border-r ${
            activeTab === "upcoming"
              ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
              : ""
          } md:h-[50px] md:w-[100px]`}
          style={
            activeTab === "upcoming"
              ? {
                  borderWidth: "0.5px",
                  boxShadow: "0px 2px 5px 0px #D2F3FA",
                }
              : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
          }
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`border-r ${
            activeTab === "completed"
              ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
              : ""
          } md:h-[50px] md:w-[100px]`}
          style={
            activeTab === "completed"
              ? {
                  borderWidth: "0.5px",
                  boxShadow: "0px 2px 5px 0px #D2F3FA",
                }
              : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
          }
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`border-r ${
            activeTab === "total"
              ? "border-gray-300 bg-gradient bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-blue-200"
              : ""
          } md:h-[50px] md:w-[100px]`}
          style={
            activeTab === "total"
              ? {
                  borderWidth: "0.5px",
                  boxShadow: "0px 2px 5px 0px #D2F3FA",
                }
              : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
          }
          onClick={() => setActiveTab("total")}
        >
          Total
        </button>
      </div>
      <div className="mt-[50px]">
        <div>
          {activeTab === "today" && <Today />}
          {activeTab === "upcoming" && <Upcoming />}
          {activeTab === "completed" && <Completed />}
          {activeTab === "total" && <Total />}
        </div>
      </div>
      {!portal ? <AddAppointment onUpdateParentState={childData} /> : null}
    </AppProvider>
  );
}
