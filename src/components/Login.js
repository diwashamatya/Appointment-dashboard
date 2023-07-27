import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Forget from "../components/ForgetPassword/Forget";
import Reset from "./Reset/Reset";
import Otp from "../components/OTP/Otp";
import "./Login.css";

const EyeIcon = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Edit / Show">
      <g id="Vector">
        <path
          d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>
);
const closeIcon = (
  <svg
    width="25"
    height="30"
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

const UnShow = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Edit / Hide">
      <path
        id="Vector"
        d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);
export default function SignUp() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setActiveTab("forget");
  };

  const [activeTab, setActiveTab] = useState("forget");

  const childData = (data) => {
    setActiveTab(data);
  };
  function fetchData() {
    axios
      .get("http://localhost:3030/login")
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("login");
    // Check for empty email and password fields
    if (!formState.email.trim() || !formState.password.trim()) {
      console.log("Form validation failed");
      return;
    }
    const result = data.filter(
      (da) => da.email === formState.email && da.password === formState.password
    );
    if (result.length > 0) {
      setLogin(true);
    } else {
      console.log("Invalid email or password");
      setInvalidLogin(true);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setInvalidLogin(false);
  };
  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  return (
    <>
      <div className=" relative flex flex-col w-full md:w-[420px]">
        <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
          ADMIN LOGIN
        </p>
        <p
          className="m-2.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
          style={{
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Welcome! Please enter your details.
        </p>
        <div className=" mt-1 mb-[-5px]">
          {invalidLogin ? (
            <p className=" pl-2 text-[red] font-sans font-[600] text-[14px] ">
              Email or Password Invalid !
            </p>
          ) : null}
        </div>
        <form
          className=" relative flex flex-col w-full px-2 mt-4 justify-center font-sans items-center md:px-0 "
          onSubmit={handleSubmit}
        >
          <label
            className="w-full text-left pl-3"
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            Email
          </label>
          <div className=" w-full  flex justify-center">
            <input
              className={`w-full rounded-[10px]  text-[14px] h-[39px] m-2  pl-[12px]  focus:outline-none bg-[#FFF]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[50px] md:placeholder:text-[14px] md:pl-[17px] ${
                invalidLogin ? " border-[#d51515]   bg-[#fefefe]" : ""
              } `}
              style={{
                border: "1px solid #DDE7F2",
                boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <label
            className="w-full text-left pl-3 mt-4 font-sans"
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            Password
          </label>
          <div className="relative w-full flex justify-center">
            <input
              className={`w-full rounded-[10px]  text-[14px] h-[39px] m-2 pl-[12px] focus:bg-white  focus:outline-none bg-[#FFF]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[50px] md:placeholder:text-[14px] md:pl-[17px] ${
                invalidLogin ? " border-[#d51515]   bg-[#fefefe]" : ""
              } `}
              style={{
                border: "1px solid #DDE7F2",
                boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              // Use the toggle function as the onClick handler
            >
              {formState.password !== "" && (
                <div className="mr-2" onClick={togglePasswordVisibility}>
                  {show ? <UnShow /> : <EyeIcon />}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-3 w-full pl-3 pr-3  ">
            <div className=" flex justify-center gap-2 items-center text-center  ">
              <input className="w-[18px] h-[18px]" type="checkbox"></input>
              <div className="text-[13px] font-man">Remember me</div>
            </div>
            <div>
              <div>
                <button
                  type="button"
                  className="text-[#09329D] text-[13px] hover:text-[#0078D4] active:text-[#005A9E]"
                  onClick={onOpenModal}
                >
                  Forgot password
                </button>
                <Modal
                  open={open}
                  onClose={onCloseModal}
                  center
                  closeIcon={closeIcon}
                  closeOnOverlayClick={true}
                >
                  <div>
                    {activeTab === "forget" && (
                      <Forget onUpdateParentState={childData} />
                    )}

                    {activeTab === "otp" && (
                      <Otp onUpdateParentState={childData} />
                    )}
                    {activeTab === "reset" && <Reset />}
                  </div>
                </Modal>
              </div>
              {/* <Link to="/forgetpassword" className="text-[#09329D] text-[13px]">
                Forgot password
              </Link> */}
            </div>
          </div>

          <button
            className="w-full h-[40px] mt-5 rounded-[10px] font-sans font-[600] text-[17px] bg-[#4556EA] md:w-[400px] md:h-[45px] text-white hover:bg-[#3A45B4] active:bg-[#2C3477]"
            type="submit"
            style={{
              lineHeight: "normal",
              letterSpacing: "0.4px",
            }}
          >
            Sign in
          </button>

          <p className="mt-4 font-sans text-[#474749]">
            Don’t have an account?
            <Link to="/signup">
              <span className="text-[#1E4AE9] font-[600] ml-3  font-sans  hover:text-[#3A45B4] active:text-[#2C3477] ">
                Sign Up
              </span>
            </Link>
            {login ? <Navigate to="home" /> : null}
          </p>
        </form>
        <button onClick={() => setLogin(true)}>
          -- {login ? <Navigate to="home" /> : null}
        </button>
      </div>
      {/* <div>
        {invalidLogin ? (
          <div
            // style={{
            //   boxShadow:
            //     "0px 3px 3px 0px rgba(0, 0, 0, 0.25), 3px 0px 3px 0px rgba(0, 0, 0, 0.25)",
            // }}
            className="shadow-shado2 absolute top-[47%]   md:top-20 md:right-14 bg-white border-red-500  border rounded-[10px] flex justify-center items-center md:h-[60px] transition-opacity duration-100 animate-fade-in"
          >
            <p className=" pl-2 text-[red] relative font-[400] text-[14px] md:w-[220px] ">
              <svg
                className="w-5 absolute left-[10px] "
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Warning / Triangle_Warning">
                  <path
                    id="Vector"
                    d="M12 9.00006V13.0001M4.37891 15.1999C3.46947 16.775 3.01489 17.5629 3.08281 18.2092C3.14206 18.7729 3.43792 19.2851 3.89648 19.6182C4.42204 20.0001 5.3309 20.0001 7.14853 20.0001H16.8515C18.6691 20.0001 19.5778 20.0001 20.1034 19.6182C20.5619 19.2851 20.8579 18.7729 20.9172 18.2092C20.9851 17.5629 20.5307 16.775 19.6212 15.1999L14.7715 6.79986C13.8621 5.22468 13.4071 4.43722 12.8135 4.17291C12.2957 3.94236 11.704 3.94236 11.1862 4.17291C10.5928 4.43711 10.1381 5.22458 9.22946 6.79845L4.37891 15.1999ZM12.0508 16.0001V16.1001L11.9502 16.1003V16.0001H12.0508Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
              Email or Password Invalid
            </p>
          </div>
        ) : null}
      </div> */}
    </>
  );
}
