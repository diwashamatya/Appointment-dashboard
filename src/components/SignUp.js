import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  const validateForm = () => {
    let isValid = true;

    if (!formState.name) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      isValid = false;
    } else if (formState.name.length < 8) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: " Must be at least 8 characters",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (!formState.email) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Required",
      }));
      isValid = false;
    } else {
      const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

      if (!emailRegex.test(formState.email)) {
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

    if (!formState.phoneNumber) {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: " Required",
      }));
      isValid = false;
    } else if (!/^[0-9]{10}$/i.test(formState.phoneNumber)) {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Invalid",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "",
      }));
    }

    if (!formState.password) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Required",
      }));
      isValid = false;
    } else if (formState.password.length < 6) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: " Must be at least 6 characters long",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "",
      }));
    }

    if (!formState.confirmPassword) {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: " Required",
      }));
      isValid = false;
    } else if (formState.confirmPassword !== formState.password) {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: " Password does not match",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        confirmPassword: "",
      }));
    }

    return isValid;
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    if (validateForm()) {
      axios
        .post("http://localhost:3030/login", formState)
        .then((res) => {
          setFormState({
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          });
          setLogin(true);

          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: sanitizedValue,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      phoneNumber: "",
    }));
  };

  return (
    <div className="flex flex-col w-full md:w-[420px]  ">
      {/* bg-[#EEECEC] focus:bg-[#F4F3F3] */}
      {/* bg-[#F5F9FF] focus:bg-white */}
      <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
        ADMIN SIGNUP
      </p>
      <p
        className="m-1.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
        style={{
          fontStyle: "normal",
          fontWeight: "400",
        }}
      >
        Please enter your details.
      </p>
      <form
        className="flex flex-col w-full mt-3 justify-center items-center gap-1 px-2 md:px-0 "
        onSubmit={handleSubmit}
      >
        {/* <div className="relative w-full pr-3 md:w-auto md:pr-0">
          <input
            className={`rounded-[5px] w-full text-[13px] h-[39px] m-1.5 pl-[12px] border-[0.5px] bg-[#dceaff4d] shadow-shado2   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[13px] placeholder:text-[#8B8989] md:w-[400px] md:h-[45px] md:placeholder:text-[14px] md:pl-[17px]${
              isFocused ? "placeholder-transparent" : ""
            }`}
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder=""
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <label
            className={`absolute border  transparent text-left left-4 top-3 md:top-4  transition-all duration-300 text-gray-500 text-sm ${
              isFocused ? "-translate-y-1/2 text-[7px]" : ""
            }`}
          >
            Name
          </label>
          <p className="text-left w-full pl-2  text-[11px] text-[red] mt-[-07px]">
            {formErrors.name && <span>{formErrors.name}</span>}
          </p>
        </div> */}
        <div className="  relative w-full mr-2 md:mr-0">
          <input
            className={`w-full  border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-1 pl-[12px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              formErrors.name !== "" ? " " : ""
            }`}
            style={{
              // boxShadow: "0px 0.8px 0px 0px rgba(0, 0, 0, 0.19)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <p className=" absolute top-5 right-0 pr-3  text-[11px] font-sans font-[400] text-[red] md:pr-5">
            {formErrors.name && <span>{formErrors.name}*</span>}
            {formErrors.name === "" &&
            formState.name !== "" &&
            formState.name.length > 8 ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L5.24264 9.24264L13.727 0.757324"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : null}
          </p>
        </div>

        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem]  pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              formErrors.email !== "" ? " " : ""
            }`}
            style={{
              // boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <p className=" absolute top-5 right-0 pr-3  text-[11px] text-[red] md:pr-5 ">
            {formErrors.email && <span>{formErrors.email}*</span>}

            {formErrors.email === "" &&
            formState.email !== "" &&
            /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(formState.email) ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L5.24264 9.24264L13.727 0.757324"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : null}
          </p>
        </div>
        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none  rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem]  pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none   placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              formErrors.phoneNumber !== "" ? " " : ""
            }`}
            style={{
              // boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="tel"
            name="phoneName"
            onChange={handlePhoneNumberChange}
            value={formState.phoneNumber}
            placeholder="Phone No"
          />
          <p className=" absolute  top-5 right-0 pr-3  text-[11px] text-[red] md:pr-5">
            {formErrors.phoneNumber && <span>{formErrors.phoneNumber}*</span>}
            {formErrors.phoneNumber === "" &&
            formState.phoneNumber !== "" &&
            formState.phoneNumber.length > 9 ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L5.24264 9.24264L13.727 0.757324"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : null}
          </p>
        </div>
        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem] pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              formErrors.password !== "" ? " " : ""
            }`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <p className=" absolute  top-5 right-0 pr-3  text-[11px] text-[red] md:pr-5">
            {formErrors.password && <span>{formErrors.password}*</span>}
            {formErrors.password === "" &&
            formState.password !== "" &&
            formState.password.length >= 6 ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L5.24264 9.24264L13.727 0.757324"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : null}
          </p>
        </div>
        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem] pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              formErrors.confirmPassword !== "" ? "  " : ""
            }`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <p className=" absolute  top-5 right-0 pr-3  text-[11px] text-[red] md:pr-5">
            {formErrors.confirmPassword && (
              <span>{formErrors.confirmPassword}*</span>
            )}
            {formErrors.confirmPassword === "" &&
            formState.confirmPassword !== "" &&
            formState.confirmPassword === formState.password ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5L5.24264 9.24264L13.727 0.757324"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : null}
          </p>
        </div>

        <button
          className="w-full h-[40px] mt-4 rounded-[10px] font-sans font-[600] text-[17px] bg-[#60BFE5] md:w-[400px] md:h-[45px] text-white hover:bg-[#4FAED7] active:bg-[#3aa8d7] focus:outline-none"
          type="submit"
          style={{
            lineHeight: "normal",
            letterSpacing: "0.4px",
          }}
        >
          Sign up
        </button>
        <p className=" w-full  mt-1 text-[11px] text-[#474749] md:w-[400px]">
          By signing up, you agree to the Neutroline User Agreement, Privacy
          Policy, and Cookie Policy.
        </p>
        <p className="mt-2.5 font-sans  text-[#474749]">
          Already have an account?
          <Link to="/">
            <span className="text-[#1E4AE9] font-[700] ml-3 font-sans hover:text-[#3A45B4] active:text-[#2C3477]">
              Sign In
            </span>
            {login ? <Navigate to="/" /> : null}
          </Link>
        </p>
      </form>
    </div>
  );
}
