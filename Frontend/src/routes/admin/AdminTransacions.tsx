import AdminNavbar from "@/components/admin/AdminNavbar"
import { useState } from "react"

const AdminTransacions = () => {
    const [first, setfirst] = useState([]);

    

    return (
        <div className="w-full h-[100dvh] text-primary">
            <AdminNavbar />
            <div className="h-[90vh] w-full max-w-7xl mx-auto px-6 py-4 flex flex-col justify-between">
            <h1 className="text-2xl text-gray-300">Recent Transactions</h1>
            <div className="h-[75vh] customer-table">
                <div className="overflow-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Account number</th>
                                <th>Balance</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdminTransacions