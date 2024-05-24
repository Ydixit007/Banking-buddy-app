import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData, storeNewUserData } from "@/utils/user";
import { loginUser } from "@/redux/reducers/userReducer";

const DepositMoneyModal = ({ accountNumber }: { accountNumber: number }) => {
    const [Amount, setAmount] = useState<number>(0);
    const dispatch = useDispatch();

    const depositMoney = async () => {
        await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/transactions/deposit`, {
            accountNumber: accountNumber,
            amount: Amount,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const user = await getUserData(accountNumber);
        dispatch(loginUser(user));
        storeNewUserData(user.user);
    }

    return (
        <dialog id="deposit_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-medium text-lg">Deposit Money : {accountNumber}</h3>
                <p className="py-4"></p>
                <div className="modal-action w-full">
                    <form method="dialog" className="flex flex-col w-full gap-4">
                        {/* if there is a button in form, it will close the modal */}
                        <input value={Amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" placeholder="Enter amount for deposit" className="input input-bordered w-full" />
                        <div className="w-full flex justify-end">
                            <button className="btn mr-2">Close</button>
                            <button onClick={depositMoney} className="btn btn-primary">Deposit</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default DepositMoneyModal