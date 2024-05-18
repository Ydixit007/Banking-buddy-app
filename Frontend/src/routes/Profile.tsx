import Navbar from "@/components/Navbar"
import { userReducerInitialState } from "@/redux/types/reducer.types";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [transcations, setTranscations] = useState([]);

  const getTransactions = async() =>{
    const res = await axios.get(``)
  }

  return (
    <div className="w-full min-h-screen text-primary">
      <Navbar>
        <>
          <div className="profile py-4 flex justify-between items-center">
            <div className="">
              <h1 className="text-xl">Welcome, {user?.fullName}</h1>
              <div className="email text-sm">{user?.email}</div>
              <div className="phone text-sm">{user?.phone}</div>
            </div>
            <div className="">
              <div className="balance text-xl">Balance: {user?.accountBalance}</div>
              <div className="acc text-sm">{user?.accountNumber}</div>
            </div>
          </div>
          <div className="recent">
            
          </div>
        </>
      </Navbar>
    </div>
  )
}

export default Profile