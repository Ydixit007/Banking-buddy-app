import AdminNavbar from "@/components/admin/AdminNavbar"
import { LoanResponse, MessageResponse, Loan } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminLoans = () => {

    const [loans, setLoans] = useState<Loan[]>([])

    const getLoans = async () => {
        const userString = localStorage.getItem("user");
        let admin: MessageResponse | null = null;
        if (userString) {
            try {
                admin = JSON.parse(userString);
            } catch (error) {
                console.error("Please login first");
            }
        }
        if (admin) {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/loan/admin/all?accountNumber=${admin.user.accountNumber}`);
            const data: LoanResponse = res.data;
            setLoans(data.loans);
        }
    }

    useEffect(() => {
        getLoans();
    }, [])


    return (
        <div className="w-full h-[100dvh] text-primary">
            <AdminNavbar />
            <div className="h-[90vh] w-full max-w-7xl mx-auto px-6 py-4 flex flex-col justify-between">
                <h1 className="text-2xl text-gray-300">Loans</h1>
                <div className="h-[75vh] customer-table overflow-y-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Account Number</th>
                                <th>Applied on</th>
                                <th>Due on</th>
                                <th>Loan Amount</th>
                                <th>Status</th>
                                <th>Approve loan</th>
                                <th>Reject loan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loans.length > 0 && loans.map((loan, index) => {
                                    const applied = new Date(loan.appliedOn);
                                    const due = new Date(loan.dueDate);
                                    return <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{loan.accountNumber}</td>
                                        <td>{`${applied.getDate()}-${applied.getMonth() + 1}-${applied.getFullYear()}`}</td>
                                        <td>{`${due.getDate()}-${due.getMonth() + 1}-${due.getFullYear()}`}</td>
                                        <td>{loan.loanAmount}</td>
                                        <td>{loan.status}</td>
                                        {
                                            loan.status === "applied" && <><td><button className="btn btn-sm">Approve</button></td>
                                                <td><button className="btn btn-sm">Reject</button></td></>
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminLoans