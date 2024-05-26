import AdminNavbar from "@/components/admin/AdminNavbar"
import { MessageResponse, Transaction, TransactionResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react"

const AdminTransacions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [pageCount, setPageCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);

    const getTransactions = async () => {
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
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/transactions/all?accountNumber=${admin.user.accountNumber}&page=${page}`);
            const data: TransactionResponse = res.data;
            if (data.total) {
                setPageCount(Math.floor(data.total / 10));
                setTransactions(data.transactions);
            }
        }
    }

    useEffect(() => {
        getTransactions();
    }, [page])

    return (
        <div className="w-full h-[100dvh] text-primary">
            <AdminNavbar />
            <div className="h-[90vh] w-full max-w-7xl mx-auto px-6 py-4 flex flex-col justify-between">
                <h1 className="text-2xl text-gray-300">Recent Transactions</h1>
                <div className="h-[75vh] customer-table overflow-y-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Transaction Id</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.length > 0 && transactions.map((trans, index) => <tr>
                                    <th>{(index + 1) + (page * 10) - 10}</th>
                                    <td>{trans._id}</td>
                                    <td>{trans.sender}</td>
                                    <td>{trans.receiver}</td>
                                    <td>{trans.amount}</td>
                                    <td>{trans.type}</td>
                                    <td>{String(new Date(trans.createdAt))}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="bottom flex items-center gap-4 justify-end">
                    <div className="buttons flex gap-2">
                        {page > 1 ? <button onClick={() => setPage(page - 1)} className="btn btn-sm">Prev</button> : <button className="btn btn-sm btn-disabled">Prev</button>}
                        {page < pageCount ? <button onClick={() => setPage(page + 1)} className="btn btn-sm">Next</button> : <button className="btn btn-sm btn-disabled">Next</button> }
                    </div>
                    <div className="count">{page}/{pageCount}</div>
                </div>
            </div>
        </div>
    )
}

export default AdminTransacions