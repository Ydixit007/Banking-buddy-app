import { BeneficiaryType, MessageApiResponse, MessageResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const SendMoneyModal = ({ beneficary, maxLimit }: { beneficary?: BeneficiaryType, maxLimit: number }) => {
    const [amount, setAmount] = useState<number>(0);

    const sendMoney = async () => {
        const userData: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
        const user = userData.user;
        if (amount > maxLimit) {
            toast.error("Amount greater than limit");
            return;
        }
        if (user && beneficary && amount) {
            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/transactions/transfer`, {
                    sender: user.accountNumber,
                    receiver: beneficary.accountNumber,
                    amount,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                toast.success("Transfer successful");
                setAmount(0);
            } catch (err) {
                const message = err as AxiosError;
                if (message.response) {
                    const response: MessageApiResponse = message.response.data as MessageApiResponse;
                    toast.error(response.message);
                }
            }
        }
    }

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setAmount(Number(e.target.value));
        }
    }

    return (
        <dialog id="send_money_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-medium">Send Money to {beneficary?.fullName}</h3>
                <input onChange={handelChange} value={amount || ""} className="input w-full mt-4" type="text" placeholder="Enter an amount" />
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn mr-4">Close</button>
                        <button onClick={sendMoney} className="btn btn-primary">Send Money</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default SendMoneyModal