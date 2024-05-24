import Navbar from "@/components/Navbar"
import { userReducerInitialState } from "@/redux/types/reducer.types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DepositMoneyModal from "@/components/modals/DepositMoneyModal";
import { Transaction, TransactionResponse } from "@/types/types";
import TransactionCard from "@/components/TransactionCard";
import { getUserData, storeNewUserData } from "@/utils/user";
import { loginUser } from "@/redux/reducers/userReducer";
import ShowQRModal from "@/components/modals/ShowQRModal";
import EditProfileModal from "@/components/modals/EditProfileModal";

interface ModalType extends HTMLElement {
  showModal: () => {}
}

const Profile = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();
  const [transcations, setTranscations] = useState<Transaction[]>([]);

  const getTransactions = async () => {
    if (user && transcations.length === 0) {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/transactions/recent/${user.accountNumber}`);
      const transactionsData: TransactionResponse = res.data;
      setTranscations(transactionsData.transactions);
    }
  }

  const handelDeposit = async () => {
    const modal: ModalType = document.getElementById('deposit_modal') as ModalType;
    if (modal) {
      modal.showModal();
    }
  }

  const getLatestUserData = async () => {
    if (user) {
      const userData = await getUserData(user.accountNumber);
      dispatch(loginUser(userData));
      storeNewUserData(userData.user);
    }
  }

  const ShowQR = () => {
    const modal = document.getElementById("show_QR") as HTMLDialogElement;
    modal.showModal();
  }

  const editProfile = () => {
    const modal = document.getElementById("edit_profile") as HTMLDialogElement;
    modal.showModal();
  }

  useEffect(() => {
    getTransactions();
  }, [user])

  useEffect(() => {
    getLatestUserData();
  }, [])

  return (
    <div className="min-h-[100dvh] w-full text-primary">
      <Navbar>
        <div className="w-full md:px-4">
          <div className="profile py-4 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl">{user?.fullName} <span><button onClick={editProfile} className="btn btn-xs">Edit</button></span></h1>
              <div className="email text-sm text-gray-400">{user?.email}</div>
              <div className="phone text-sm text-gray-400">{user?.phone}</div>
              <button onClick={ShowQR} className="btn btn-sm">Show QR</button>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="balance text-xl font-semibold">Bal: {user?.accountBalance}</div>
              <div className="acc text-sm">{user?.accountNumber}</div>
              <button onClick={handelDeposit} className="btn btn-primary btn-sm">Deposit</button>
            </div>
          </div>
          <hr />
          <div className="recent mt-4">
            <h3 className="text-lg">Recent Transactions</h3>
            <div className="history flex flex-col gap-4 mt-4 h-[60vh] overflow-y-scroll pr-2">
              {transcations.length >= 1 && transcations.map((trans) => <TransactionCard key={trans._id} amount={trans.amount} date={trans.createdAt} id={trans._id} receiver={trans.receiver} sender={trans.sender} type={trans.type} myAccountNumber={user?.accountNumber || 0} />
              )}
            </div>
          </div>
          <DepositMoneyModal accountNumber={user?.accountNumber || 0} />
          {user && <ShowQRModal accountNumber={user.accountNumber} />}
          {user && <EditProfileModal phoneProp={user.phone} fullNameProp={user.fullName} addressProp={user.address} accountNumber={user.accountNumber} getLatestUserData={getLatestUserData} />}
        </div>
      </Navbar>
    </div>
  )
}

export default Profile