import { User } from "@/types/types"

const ViewCustomerModal = ({ customer }: { customer: User }) => {
    const birthday = new Date(customer.dob);
    return (
        customer && <dialog id="view_customer" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-medium text-lg text-gray-400">Customer Details</h3>
                <table className="table mt-4 w-full">
                    <tbody>
                        <tr>
                            <td>Customer Name</td>
                            <td>{customer.fullName}</td>
                        </tr>
                        <tr>
                            <td>Email id</td>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{customer.phone}</td>
                        </tr>
                        <tr>
                            <td>Account Number</td>
                            <td>{customer.accountNumber}</td>
                        </tr>
                        <tr>
                            <td>Balance</td>
                            <td>{customer.accountBalance}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{`${birthday.getDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()}`}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{customer.address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </dialog>
    )
}

export default ViewCustomerModal