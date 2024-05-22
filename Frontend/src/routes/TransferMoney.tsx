import QRModal from "@/components/modals/QRModal";
import Navbar from "@/components/Navbar"
import { MessageResponse } from "@/types/types";
import { getUserData } from "@/utils/user";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ModalType extends HTMLElement {
    showModal: () => {}
}

const TransferMoney = () => {

    const [account, setAccount] = useState<number>(0);
    const [activateCam, setActivateCam] = useState(false);
    const [amount, setAmount] = useState<number>(0);
    const [receiverAccount, setReceiverAccount] = useState<MessageResponse>();

    const handelDeposit = async () => {
        const modal: ModalType = document.getElementById('qr_modal') as ModalType;
        if (modal) {
            setActivateCam(true);
            modal.showModal();
        }
    }

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setAccount(Number(e.target.value));
        }
    }

    const handelAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setAmount(Number(e.target.value));
        }
    }

    const getAccountDetails = async () => {
        if (account > 1000000000) {
            const userAccount: MessageResponse = await getUserData(account);
            setReceiverAccount(userAccount);
        } else {
            setReceiverAccount(undefined);
        }
    }

    const resetForm = () => {
        setAccount(0);
        setAmount(0);
        setReceiverAccount(undefined);
        setActivateCam(false);
    }

    const TransferMoney = async () => {
        const user: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
        if (user && receiverAccount) {
            const userAccount = user.user.accountNumber;
            try {
                await axios.post("http://localhost:3000/api/v1/transactions/transfer", {
                    sender: userAccount,
                    receiver: receiverAccount.user.accountNumber,
                    amount: amount,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                toast.success("Transaction Successful");
                resetForm();
            } catch (error) {
                toast.error("Transaction Failed");
            }
        }
    }

    useEffect(() => {
        getAccountDetails();
    }, [account])


    return (
        <div className="min-h-screen w-full flex text-primary">
            <Navbar>
                <div className="p-4 flex flex-col">
                    <h1 className="text-2xl font-medium mb-4">Transfer Money</h1>
                    <div className="w-full">
                        <input value={account || ""} onChange={handelChange} maxLength={10} className="input w-full" type="text" placeholder="Search Account Number" />
                    </div>
                    {receiverAccount && <div className="receiverDetails flex flex-col pt-4">
                        <div className="">To: {receiverAccount.user.fullName}</div>
                        <div className="">Acc: {receiverAccount.user.accountNumber}</div>
                        <input className="input w-full my-4" value={amount || ""} onChange={handelAmountChange} type="text" placeholder="Enter the amount for the transfer" />
                    </div>}
                    <div className="buttons mt-4 flex gap-4 ml-auto">
                        <button onClick={handelDeposit} className="btn">Scan QR</button>
                        <button onClick={TransferMoney} className="btn btn-primary">Send Money</button>
                    </div>
                </div>
            </Navbar>
            <QRModal setAccount={setAccount} setActivateCam={setActivateCam} activateCam={activateCam} />
        </div>
    )
}

export default TransferMoney