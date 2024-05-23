import { MessageApiResponse, MessageResponse } from "@/types/types";
import { getUserData } from "@/utils/user";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast";

const AddBeneficiaryModal = ({ getBeneficiariesData }: { getBeneficiariesData: () => void }) => {
    const [AccountNumber, setAccountNumber] = useState<number>(0);
    const [benficiary, setBenficiary] = useState<MessageResponse>();
    const [maxLimit, setMaxLimit] = useState<number>(0);

    const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setAccountNumber(Number(e.target.value));
        }
    }

    const handelMaxLimit = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(e.target.value)) {
            setMaxLimit(Number(e.target.value));
        }
    }

    const getAccountDetails = async () => {
        if (AccountNumber > 1000000000) {
            try {
                const userAccount: MessageResponse = await getUserData(AccountNumber);
                setBenficiary(userAccount);
            } catch (err) {
                const message = err as AxiosError;
                if (message.response) {
                    const response: MessageApiResponse = message.response.data as MessageApiResponse;
                    toast.error(response.message);
                }
            }
        } else {
            setBenficiary(undefined);
        }
    }

    const addBeneficiary = async () => {
        if (benficiary) {
            const user: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
            if (user) {
                try {
                    const res = await axios.post("http://localhost:3000/api/v1/beneficiaries/add", {
                        userAccountNumber: user.user.accountNumber,
                        beneficiaryAccountNumber: AccountNumber,
                        maxLimit,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const success: MessageApiResponse = res.data;
                    toast.success(success.message);
                    setAccountNumber(0);
                    setBenficiary(undefined);
                    getBeneficiariesData();
                } catch (err) {
                    const message = err as AxiosError;
                    if (message.response) {
                        const response: MessageApiResponse = message.response.data as MessageApiResponse;
                        console.log(response.message);
                    }
                }
            }
        }
    }

    useEffect(() => {
        getAccountDetails();
    }, [AccountNumber])


    return (
        <dialog id="add_beneficiary_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Add beneficiary</h3>
                <input value={AccountNumber || ""} placeholder="Search account number" className="input w-full my-4" onChange={handelChange} type="text" />
                {benficiary && <div className="flex flex-col">
                    <hr />
                    <div className="flex justify-between my-1">
                        <div className="username">{benficiary.user.fullName}</div>
                        <div className="accountnumber">{benficiary.user.accountNumber}</div>
                    </div>
                    <div className="flex flex-col">
                        <input className="input mt-1" type="text" value={maxLimit || ""} placeholder="Enter Max Limit" onChange={handelMaxLimit} />
                        <div className="text-xs text-gray-400 mt-2">Default 5000</div>
                    </div>
                </div>}

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn mr-4">Close</button>
                        <button onClick={addBeneficiary} className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddBeneficiaryModal