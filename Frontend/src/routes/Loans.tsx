import Navbar from "@/components/Navbar"
import { Loan, LoanResponse, MessageResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Loans = () => {
    const [Loans, setLoans] = useState<Loan[]>();

    const getYourLoans = async () => {
        const userData: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
        if (userData) {
            const res = await axios.get(`http://localhost:3000/api/v1/loan/all/${userData.user.accountNumber}`);
            const data: LoanResponse = res.data;
            setLoans(data.loans);
        }
    }

    useEffect(() => {
        getYourLoans();
    }, [])

    return (
        <div className="w-full min-h-screen text-primary">
            <Navbar>
                <div className="w-full p-4 min-h-[90vh]">
                    <div className="w-full flex justify-between">
                        <h1 className="text-2xl text-gray-300">Your Loans</h1>
                        <button className="btn btn-sm btn-primary">Apply</button>
                    </div>
                    <div className="mt-4 max-w-screen-2xl mx-auto pt-4">
                        <div className="overflow-x-auto">
                            <table className="table">
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
                            </table>
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Loans