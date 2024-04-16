import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import SignUpPage from "./routes/SignUpPage";
import LandingPage from "./routes/LandingPage";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Beneficiaries from "./routes/Beneficiaries";

function App() {
  return (
    <div className="dark antialiased">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="beneficiaries" element={<Beneficiaries />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
