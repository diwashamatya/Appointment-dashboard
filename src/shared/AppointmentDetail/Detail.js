import React from "react";

function Detail({ data }) {
  return (
    <div className="">
      <div className="w-[280px] rounded-md flex justify-center gap-7 item bg-[#ffffff] text-[15px] mx-12 my-6 ">
        <div className="flex text-[#bbbbbb]  flex-col gap-2 py-2">
          <p>Name:</p>
          <p>Email:</p>
          <p>Contact:</p>
          <p>Service:</p>
          <p>Duration:</p>
          <p>Date:</p>
          <p>Time:</p>
          <p>Status:</p>
        </div>
        <div className="flex  text-[#6b6b6b] flex-col gap-2 py-2">
          <p>{data.name}</p>
          <p>{data.email}</p>
          <p>{data.contact}</p>
          <p>{data.services}</p>
          <p>{data.duration}</p>
          <p>{data.date}</p>
          <p>{data.time}</p>
          <p>{data.status}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
