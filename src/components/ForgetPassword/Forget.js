import { useState, useEffect } from "react";
import React from "react";
import { ScaleLoader } from "react-spinners";

function Forget({ onUpdateParentState }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);
  function handleChange(e) {
    setEmail(e.target.value);
  }

  function handleForgetSubmit(e) {
    e.preventDefault();
    if (email !== "") {
      setLoading(true);
      setTimeout(() => {
        onUpdateParentState("otp");
      }, 1000);
    }
  }

  return (
    <>
      <form className="  relative w-full mt-6 mb-6  mx-8   flex flex-col md:justify-center gap-4 md:items-start md:w-auto">
        <div>
          <h1 className="text-[20px] ml-1 text-start font-sans font-[700]">
            Forget Password?
          </h1>
          <p className="text-[12px] ml-1  text-start font-sans mt-2  md:w-[250px]">
            {/* Please enter the email */}
            Enter the email, phone number, or username.
          </p>
        </div>

        <div className="flex flex-col mt-3 gap-4 justify-center items-center">
          <input
            className={`w-full rounded-[6px]  text-[14px] h-[39px]   pl-[12px]  focus:outline-none  focus:bg-[#F6F6F6] bg-[#efeeee]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[290px] md:h-[50px] md:placeholder:text-[14px] md:pl-[15px] `}
            style={{
              border: "1px solid #DDE7F2",
              boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset",
            }}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
          <button
            className="text-center w-full h-[40px] mt-4 rounded-[6px] font-sans font-[600] text-[16px] bg-[#4556EA] md:w-[290px] md:h-[45px] text-white hover:bg-[#3A45B4] active:bg-[#2C3477]"
            type="button"
            style={{
              lineHeight: "normal",
              letterSpacing: "0.4px",
            }}
            onClick={handleForgetSubmit}
          >
            Continue
          </button>
        </div>
        {loading ? (
          <div className="absolute bg-[white] w-full h-full flex justify-center  items-center ">
            <ScaleLoader size={30} color={"#53217f"} loading={loading} />
          </div>
        ) : null}
      </form>
    </>
  );
}

export default Forget;
