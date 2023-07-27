import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./Sample.css";

export default function App({ onSelectDate }) {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
    setDateState(e);
  };

  function handleSelectedData(e) {
    e.preventDefault();

    const selectedMomentDate = moment(dateState);

    const date = selectedMomentDate.format("YYYY/MMM/D");
    onSelectDate(date);
  }

  return (
    <>
      <Calendar
        value={dateState}
        center
        onChange={changeDate}
        minDate={new Date()}
      />
      <p className=" text-center  ">
        Selected date is{" "}
        <b className="text-[#8585e7] ">
          {moment(dateState).format("YYYY/MMM/D")}
        </b>
      </p>

      <div className="flex justify-end mr-3">
        <button
          onClick={handleSelectedData}
          className="border text-white flex items-center py-2 px-6 text-[15px] font-sans font-[500] rounded-md bg-[#8c8ce0] hover:bg-[#7676de]"
        >
          OK
        </button>
      </div>
    </>
  );
}
