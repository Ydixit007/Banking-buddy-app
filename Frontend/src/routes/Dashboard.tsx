import ShowQRModal from "@/components/modals/ShowQRModal";
import Navbar from "@/components/Navbar";
import TransactionCard from "@/components/TransactionCard";
import { Loan, LoanResponse, MessageResponse, Transaction, TransactionResponse, User } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = ({ user }: { user: User | null }) => {
  const [transcations, setTranscations] = useState<Transaction[]>([]);
  const [Loans, setLoans] = useState<Loan[]>([]);


  const ShowQR = () => {
    const modal = document.getElementById("show_QR") as HTMLDialogElement;
    modal.showModal();
  }

  const getTransactions = async () => {
    if (user && transcations.length === 0) {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/transactions/recent/${user.accountNumber}`);
      const transactionsData: TransactionResponse = res.data;
      setTranscations(transactionsData.transactions);
    }
  }

  const getYourLoans = async () => {
    const userData: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
    if (userData) {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/loan/all/${userData.user.accountNumber}`);
      const data: LoanResponse = res.data;
      setLoans(data.loans);
    }
  }

  useEffect(() => {
    getTransactions();
    getYourLoans();
  }, [])

  return (
    user ? <div className="min-h-[100dvh] w-full flex text-primary">
      <Navbar>
        <div className="dashboard-content max-h-[95vh] w-full p-4 flex flex-col justify-between gap-2">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-medium">Welcome, {user.fullName}</h1>
            <h3 className="text-xl font-semibold">Rs. {user.accountBalance}</h3>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-gray-300">Acc: {user.accountNumber}</div>
            <button onClick={ShowQR} className="btn btn-sm">Show QR</button>
          </div>
          <div className="flex-1 max-h-[35vh] w-full py-3 flex flex-col">
            <h6 className="text-gray-400">Recent Transaction</h6>
            <div className="overflow-auto mt-2 flex flex-col gap-4 pr-2">
              {transcations.length >= 1 ? transcations.map((trans) => <TransactionCard key={trans._id} amount={trans.amount} date={trans.createdAt} id={trans._id} receiver={trans.receiver} sender={trans.sender} type={trans.type} myAccountNumber={user?.accountNumber || 0} />
              ) : <div className="flex justify-center items-center h-[35vh]">No transactions</div>} 
            </div>
          </div>
          <div className="flex-1 max-h-[35vh] w-full py-2 flex flex-col">
            <h6 className="text-gray-400">Your Loans</h6>
            <div className="overflow-x-auto pr-2">
              {Loans.length > 0 ? <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Loan amount</th>
                    <th>Applied on</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Loans && Loans.map((loan, index) => {
                      const applied = new Date(loan.appliedOn);
                      const due = new Date(loan.dueDate);
                      return <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{loan.loanAmount}</td>
                        <td>{`${applied.getDate()}-${applied.getMonth() + 1}-${applied.getFullYear()}`}</td>
                        <td>{`${due.getDate()}-${due.getMonth() + 1}-${due.getFullYear()}`}</td>
                        <td>{loan.status}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table> : <div className="w-full flex h-[35vh] justify-center items-center">No loans</div>}
            </div>
          </div>
          <ShowQRModal accountNumber={user.accountNumber} />
        </div>
      </Navbar>
    </div> : <div className="min-h-[100dvh] w-full flex justify-center items-center">
      Please login again
    </div>
  );
};

export default Dashboard;
