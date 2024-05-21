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
import { MessageResponse } from "./types/types";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  
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
          <Route path="/login" element={isLoggedIn ? <Dashboard /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Dashboard /> : <SignUpPage />} />
          <Route path="/dashboard/profile" element={isLoggedIn ? <Profile /> : <Login />} />
          <Route path="/dashboard/beneficiaries" element={isLoggedIn ? <Beneficiaries /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
