import Form from "./pages/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
// import ForgetPassword from "./pages/ForgetPassword";
// import ResetPassword from "./pages/ResetPassword";
// import OTPVerification from "./pages/OTPVerification";
import Offer from "./pages/Offer/Offer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="/signup" element={<Form />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/otp" element={<OTPVerification />}></Route> */}
          <Route path="/offer" element={<Offer />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
