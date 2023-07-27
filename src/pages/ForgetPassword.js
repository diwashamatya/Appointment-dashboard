import React from "react";
import Neutrologo from "../assets/Neutroline_logo 3.png";

import Forget from "../components/ForgetPassword/Forget";

export default function ForgetPassword() {
  return (
    <div style={{ background: "rgba(220, 234, 255, 0.30)" }}>
      <div className="text-center   flex justify-center items-center mb-5 ">
        <img
          className="w-[100px] h-[70px]"
          src={Neutrologo}
          alt="neutrosys"
        ></img>
        <h1 className="text-[22px] font-[600]">Neutroline Pvt. Ltd.</h1>
      </div>

      <div className=" flex flex-col justify-center items-center text-center gap-5 md:flex-row md:justify-center md:gap-8 md:items-start   ">
        <Forget />
      </div>
    </div>
  );
}
