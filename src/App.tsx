import HomePage from "./pages/HomePage";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/auth/CreateAccount";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<CreateAccount />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forgot" element={<ForgotPassword />}></Route>
          <Route path="/verify" element={<VerifyOTP />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
