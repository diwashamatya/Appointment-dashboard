import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../AppContext";
import vector from "../../assets/Vector.png";
import circle from "../../assets/circle.png";
import notification from "../../assets/notification.png";
import accepted from "../../assets/accepted.svg";
import ReactModal from "react-modal";
import tick2 from "../../assets/tick2.svg";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Today.css";

const closeIcon = (
  <svg
    width="23"
    height="23"
    viewBox="0 10 20 30"
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

function Total() {
  const [isOpen, setIsOpen] = useState(true);
  const [reschedule, setReschedule] = useState(false);
  const { showModal, setShowModal } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:3030/Today")
      .then((res) => {
        setData(res.data);
        console.log(showModal);
      })
      .catch((err) => {
        throw err;
      });
  }

  useEffect(() => {
    fetchData();
    setShowModal(false);
  }, [showModal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000); // Close the modal after 20 seconds

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, []);

  // const handleNotifyClick = (itemId) => {
  //   // Find the item in the data array and update its notified state
  //   const updatedData = data.map((item) => {
  //     if (item.id === itemId) {
  //       return { ...item, notified: true };
  //     }
  //     return item;
  //   });

  //   // Update the data array with the updatedData
  //   setData(updatedData);
  // };
  const handleNotifyClick = (itemId) => {
    axios
      .get(`http://localhost:3030/Today/${itemId}`)
      .then((response) => {
        const itemToUpdate = response.data;
        const updatedItem = { ...itemToUpdate, notified: true };

        return axios.put(`http://localhost:3030/Today/${itemId}`, updatedItem);
      })
      .then((response) => {
        fetchData();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommit = (commitId) => {
    const updateStatus = data.map((item) => {
      if (item.id === commitId) {
        return {
          ...item,
          status: "Accepted",
          color: "green",
        };
      }
      return item;
    });
    setData(updateStatus);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/Today/${id}`)
      .then((res) => {
        fetchData();
        onCloseModal();
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className=" flex justify-center ">
      <table>
        <thead className="border rounded-[80px]">
          <tr className="h-[50px]  text-[15px] bg-[#E2F2FA] rounded-[100px]">
            <th className="  font-man font-medium  md:w-[50px] ">ID</th>
            <th className="  font-man font-medium   ">Name</th>
            <th className=" font-man font-medium md:w-[150px]">Services</th>
            <th className="font-man font-medium md:w-[100px]">Time</th>
            <th className="font-man  font-medium  md:w-[110px]">Duration</th>
            <th className=" font-man font-medium md:w-[100px]">Status</th>
            <th className="font-man font-medium md:w-[130px]">Action</th>
            <th className="font-man font-medium md:w-[120px]">Reminder</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border h-[60px]">
              <td className=" text-center">{item.id}</td>
              <td className=" text-center px-3 ">{item.name}</td>
              <td className="text-center px-3">{item.services}</td>
              <td className=" text-center text-[#0038FF]">{item.time}</td>
              <td className=" text-center  text-[#00AA3A]">{item.duration}</td>
              <td className="  text-center ">
                <div className="flex justify-evenly  items-center ">
                  <div className="flex justify-center items-centers">
                    {item.color === "yellow" ? (
                      <img className="w-2" src={circle} alt="yellow"></img>
                    ) : (
                      <img className="w-2" src={accepted} alt="green"></img>
                    )}
                  </div>
                  <div>{item.status}</div>
                </div>
              </td>
              <td className="  h-[60px] flex justify-center items-center gap-3">
                <button
                  onClick={() => handleCommit(item.id)}
                  className="group relative"
                >
                  {item.status === "Pending" ? (
                    <>
                      <p className="hidden group-hover:block absolute top-0 left-0 bg-transparent p-1 rounded mt-5 shadow">
                        Accept
                      </p>
                      <svg
                        width="17"
                        height="12"
                        viewBox="0 0 17 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.94979L5.94975 10.8995L15.8482 1"
                          stroke="#4EAD07"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        width="17"
                        height="12"
                        viewBox="0 0 17 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5.94979L5.98139 10.8995L15.9431 1"
                          stroke="#4EAD07"
                          stroke-opacity="0.43"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <p className="hidden group-hover:block absolute top-0 left-0 bg-transparent p-1 rounded mt-5 shadow">
                        Accepted
                      </p>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setReschedule(true)}
                  className="group relative"
                >
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.91788 3H4.11077C2.98043 3 2.41485 3 1.98312 3.21799C1.60335 3.40973 1.29482 3.71547 1.10133 4.0918C0.881348 4.51962 0.881348 5.08009 0.881348 6.2002V7M4.91788 3H12.9909M4.91788 3V1M12.9909 3H13.7984C14.9288 3 15.4932 3 15.9249 3.21799C16.3046 3.40973 16.6142 3.71547 16.8077 4.0918C17.0275 4.5192 17.0275 5.07899 17.0275 6.19691V7M12.9909 3V1M0.881348 7V15.8002C0.881348 16.9203 0.881348 17.4801 1.10133 17.9079C1.29482 18.2842 1.60335 18.5905 1.98312 18.7822C2.41442 19 2.97933 19 4.10745 19H13.8014C14.9295 19 15.4936 19 15.9249 18.7822C16.3046 18.5905 16.6142 18.2842 16.8077 17.9079C17.0275 17.4805 17.0275 16.9215 17.0275 15.8036V7M0.881348 7H17.0275M12.9909 15H12.993L12.9929 15.002L12.9909 15.002V15ZM8.95441 15H8.95642L8.95638 15.002L8.95441 15.002V15ZM4.91788 15H4.9199L4.91985 15.002L4.91788 15.002V15ZM12.9929 11V11.002L12.9909 11.002V11H12.9929ZM8.95441 11H8.95642L8.95638 11.002L8.95441 11.002V11ZM4.91788 11H4.9199L4.91985 11.002L4.91788 11.002V11Z"
                      stroke="#0754AD"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="hidden group-hover:block absolute top-0 left-0 bg-transparent p-1 rounded mt-5 shadow">
                    Reschedule
                  </p>
                </button>
                <button onClick={onOpenModal} className="group relative">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 8V15M7 8V15M3 4V15.8C3 16.9201 3 17.4798 3.21799 17.9076C3.40973 18.2839 3.71547 18.5905 4.0918 18.7822C4.5192 19 5.07899 19 6.19691 19H11.8031C12.921 19 13.48 19 13.9074 18.7822C14.2837 18.5905 14.5905 18.2839 14.7822 17.9076C15 17.4802 15 16.921 15 15.8031V4M3 4H5M3 4H1M5 4H13M5 4C5 3.06812 5 2.60241 5.15224 2.23486C5.35523 1.74481 5.74432 1.35523 6.23438 1.15224C6.60192 1 7.06812 1 8 1H10C10.9319 1 11.3978 1 11.7654 1.15224C12.2554 1.35523 12.6447 1.74481 12.8477 2.23486C12.9999 2.6024 13 3.06812 13 4M13 4H15M15 4H17"
                      stroke="#AD3307"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="hidden group-hover:block absolute top-0 left-0 bg-transparent p-1 rounded mt-5 shadow">
                    Delete
                  </p>
                </button>
                <Modal
                  className="hello"
                  open={open}
                  onClose={onCloseModal}
                  closeIcon={closeIcon}
                  classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                    closeButton: "customButton",
                  }}
                  center
                >
                  <div className=" w-[300px]  flex flex-col justify-center items-start gap-8">
                    <div>
                      <p className="text-[15px]  text-left  w-[100%]  font-roboto ">
                        Are you sure want to delete?
                      </p>
                    </div>

                    <div className=" w-full flex gap-4  justify-end">
                      <button
                        onClick={onCloseModal}
                        class="border text-black rounded hover:bg-[#f1f1f1] focus:outline-none px-4 py-1"
                      >
                        No
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        class="bg-[#0AA1DD] text-white rounded hover:bg-[#0192cb] focus:outline-none px-4 py-1"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </Modal>
              </td>
              <td className="text-center  ">
                <div className=" flex justify-center">
                  {!item.notified ? (
                    <button
                      className="flex bg-[#C3ECF4]  gap-2 text-[15px] justify-center items-center rounded-sm p-2"
                      onClick={() => handleNotifyClick(item.id)}
                    >
                      {item.reminder}
                      <img
                        className="w-5"
                        src={notification}
                        alt="notification"
                      />
                    </button>
                  ) : (
                    <button className="flex gap-1  bg-[#EDEDED] text-[#0038FF]  text-[14px] justify-center rounded-sm items-center p-2">
                      Notified
                      <img className="w-4" src={vector} alt="notified" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reschedule ? (
        <ReactModal className="flex justify-center" isOpen={isOpen}>
          <div className="flex flex-col justify-center items-center w-[280px] bg-[white] pb-2 border ">
            <div className="border leading-3 relative text-center font-inter font-[400] text-[16px] tracking-wide text-[white] bg-[#83A9D6] w-[280px] p-2 pb-4">
              Reschedule
              <img
                className=" w-[30px] absolute top-[77%] left-[44%] "
                src={tick2}
                alt="tick2"
              ></img>
            </div>

            <div className="bg-[white]">
              <div className="text-[12px] text-center mt-10">
                Reschedule message has been sent. Thanks
              </div>
              <div className="flex justify-center  mt-7  bg-[white]">
                <button className="border w-[50px] p-1 bg-[#517EC1] font-[600] text-[14px] text-white rounded-[4px]">
                  OK
                </button>
              </div>
            </div>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
}

export default Total;
