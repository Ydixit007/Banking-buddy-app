import { MessageResponse } from "@/types/types";
import { getUserData } from "@/utils/user";
import { useEffect, useState } from "react";

interface TransactionCard {
    date: Date,
    id: string,
    amount: number,
    type: string,
    receiver: number,
    sender: number,
    myAccountNumber: number,
}
const TransactionCard = ({ date, id, amount, type, receiver, sender, myAccountNumber }: TransactionCard) => {
    const transactionDate = new Date(date);
    const [User, setUser] = useState<MessageResponse>();

    const getReceiverData = async () => {
        if (sender === myAccountNumber) {
            const user = await getUserData(receiver);
            if (user) {
                setUser(user);
            }
        } else {
            const user = await getUserData(sender);
            if (user) {
                setUser(user);
            }
        }
    }

    useEffect(() => {
        getReceiverData();
    }, [])


    return (
        <div className="w-full min-h-20 bg-secondary flex justify-between items-center rounded-md px-4 py-2">
            <div className="">
                <div className="date text-sm text-gray-300">{`${transactionDate.getDate()}-${transactionDate.getMonth() + 1}-${transactionDate.getFullYear()}`}</div>
                {type === "transfer" && <div className="to"> {User?.user.fullName}</div>}
                <div className="id text-xs text-gray-400">{id}</div>
            </div>
            <div className={`${receiver === myAccountNumber ? "text-green-400" : "text-red-400"}`}>
                <div className="amount font-semibold">Rs. {amount}</div>
                <div className="type text-gray-400">{type}</div>
            </div>
        </div>
    )
}

export default TransactionCard