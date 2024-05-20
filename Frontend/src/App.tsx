import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import SignUpPage from "./routes/SignUpPage";
import LandingPage from "./routes/LandingPage";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Beneficiaries from "./routes/Beneficiaries";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "./redux/types/reducer.types";
import { useEffect } from "react";
import { MessageResponse } from "./types/types";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/reducers/userReducer";

function App() {
  const { user, isLoggedIn } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user: MessageResponse = JSON.parse(data);
      dispatch(loginUser(user))
    }
  }, [])

  return (
    <div className="dark antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/dashboard/beneficiaries" element={isLoggedIn ? <Beneficiaries /> : <Navigate to="/login" replace />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
