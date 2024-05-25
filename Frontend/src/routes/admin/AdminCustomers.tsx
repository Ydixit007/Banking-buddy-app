import { useEffect, useState } from "react"
import { CustomerApiResponse, MessageApiResponse, MessageResponse, User } from "@/types/types";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import ViewCustomerModal from "@/components/admin/modal/ViewCustomerModal";

const AdminCustomers = () => {
    const [customers, setCustomers] = useState<User[]>([]);
    const [customer, setCustomer] = useState<User>();

    const getAllCustomers = async () => {
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
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/all?accountNumber=${admin?.user.accountNumber}`);
                const data: CustomerApiResponse = res.data;
                if (data.users.length > 0) {
                    setCustomers(data.users);
                    setCustomer(data.users[0])
                }
            } catch (err) {
                const message = err as AxiosError;
                if (message.response) {
                    const response: MessageApiResponse = message.response.data as MessageApiResponse;
                    toast.error(response.message);
                }
            }
        } else {
            toast.error("Please login first");
        }
    }

    const openModal = (customer: User) => {
        setCustomer(customer);
        const modal = document.getElementById("view_customer") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    }

    useEffect(() => {
        getAllCustomers();
    }, [])

    return (
        <div className="h-[90vh] w-full max-w-7xl mx-auto px-6 py-4 flex flex-col justify-between">
            <h1 className="text-2xl text-gray-300">Our Customers</h1>
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
                            {customers.length > 1 && customers.map((customer, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{customer.fullName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.accountNumber}</td>
                                <td>{customer.accountBalance}</td>
                                <td><button onClick={() => openModal(customer)} className="btn btn-sm">View</button></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
            {customer && <ViewCustomerModal customer={customer} />}
        </div>
    )
}

export default AdminCustomers

