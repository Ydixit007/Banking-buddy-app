import { MessageApiResponse, MessageResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const ApplyForLoanModal = () => {
    const [amount, setAmount] = useState<number>(0);
    const [dueDate, setdueDate] = useState<string>();

    const handelAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setAmount(Number(e.target.value));
        }
    }

    const applyForLoan = async () => {
        const userData: MessageResponse = JSON.parse(localStorage.getItem("user") || "")
        if (amount && dueDate && userData) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/loan/apply`, {
                    accountNumber: userData.user.accountNumber,
                    loanAmount: amount,
                    dueDate: dueDate,
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                toast.success("Application Succesful")
            } catch (err) {
                const message = err as AxiosError;
                if (message.response) {
                    const response: MessageApiResponse = message.response.data as MessageApiResponse;
                    console.log(response.message);
                }
            }
        }
    }

    const handelDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        const today = Date.now();
        if (date.getTime() > today) {
            setdueDate(e.target.value);
        } else {
            toast.error("Date should be in future")
        }
    }

    return (
        <dialog id="apply_loan" className="modal">
            <div className="modal-box">
                <h3 className="font-medium">Apply for loan</h3>
                <input onChange={handelAmountChange} className="input w-full mt-4" value={amount || ""} type="text" placeholder="Enter loan amount" />
                <div className="text-xs text-gray-400 mt-4">Enter the date of return</div>
                <input onChange={handelDateChange} value={dueDate || ""} className="input w-full mt-1" type="date" placeholder="Enter due date" />
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mr-4">Close</button>
                        <button onClick={applyForLoan} className="btn btn-primary">Apply</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default ApplyForLoanModal