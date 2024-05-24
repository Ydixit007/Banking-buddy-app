import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import SignUpPage from "./routes/SignUpPage";
import LandingPage from "./routes/LandingPage";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Beneficiaries from "./routes/Beneficiaries";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "./redux/types/reducer.types";
import { useEffect } from "react";
import { MessageApiResponse, MessageResponse } from "./types/types";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/reducers/userReducer";
import TransferMoney from "./routes/TransferMoney";
import toast, { Toaster } from 'react-hot-toast';
import axios, { AxiosError } from "axios";
import Loans from "./routes/Loans";

interface loginRes {
  success: boolean
}

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const verifyLogin = async () => {
    const user: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/verify`, {
          token: user.token
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        const login: loginRes = res.data;
        if (login.success) {
          dispatch(loginUser(user));
        }
      } catch (err) {
        const message = err as AxiosError;
        if (message.response) {
          const response: MessageApiResponse = message.response.data as MessageApiResponse;
          localStorage.removeItem("user");
          toast.error(response.message);
        }
      }
    }
  }

  useEffect(() => {
    verifyLogin();
  }, [])

  return (
    <div className="dark antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={isLoggedIn ? <Dashboard /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Dashboard /> : <SignUpPage />} />
          <Route path="/dashboard/profile" element={isLoggedIn ? <Profile /> : <Login />} />
          <Route path="/dashboard/beneficiaries" element={isLoggedIn ? <Beneficiaries /> : <Login />} />
          <Route path="/dashboard/transfer" element={isLoggedIn ? <TransferMoney /> : <Login />} />
          <Route path="/dashboard/loans" element={isLoggedIn ? <Loans /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
