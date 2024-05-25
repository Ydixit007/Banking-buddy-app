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
import AdminDashboard from "./routes/admin/AdminDashboard";
import Admin404 from "./routes/admin/Admin404";
import AdminLoans from "./routes/admin/AdminLoans";
import AdminTransacions from "./routes/admin/AdminTransacions";

interface loginRes {
  success: boolean
}

function App() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const verifyLogin = async () => {
    const userString = localStorage.getItem("user");
    let user: MessageResponse | null = null;

    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
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
          <Route path="/login" element={isLoggedIn ? <Dashboard user={user} /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Dashboard user={user} /> : <SignUpPage />} />
          <Route path="/dashboard/profile" element={isLoggedIn ? <Profile /> : <Login />} />
          <Route path="/dashboard/beneficiaries" element={isLoggedIn ? <Beneficiaries /> : <Login />} />
          <Route path="/dashboard/transfer" element={isLoggedIn ? <TransferMoney /> : <Login />} />
          <Route path="/dashboard/loans" element={isLoggedIn ? <Loans /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard user={user} /> : <Login />} />
          {/* admin routes */}
          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Admin404 />} />
          <Route path="/admin/loans" element={user?.role === "admin" ? <AdminLoans /> : <Admin404 />} />
          <Route path="/admin/transactions" element={user?.role === "admin" ? <AdminTransacions /> : <Admin404 />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
