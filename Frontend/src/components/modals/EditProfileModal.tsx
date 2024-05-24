import { MessageApiResponse } from "@/types/types";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast";

interface EditProfileModal {
    fullNameProp: string,
    addressProp: string,
    phoneProp: number,
    accountNumber: number,
    getLatestUserData: () => void,
}

const EditProfileModal = ({ fullNameProp, addressProp, phoneProp, accountNumber, getLatestUserData }: EditProfileModal) => {
    const [fullName, setFullName] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [phone, setPhone] = useState<number>(0);

    const handelPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(Number(e.target.value))) {
            if (Number(e.target.value) < 10000000000) {
                setPhone(Number(e.target.value));
            }
        }
    }

    const EditProfile = async () => {
        try {
            await axios.post("http://localhost:3000/api/v1/user/update", {
                fullName: fullName,
                address: address,
                phone: phone,
                accountNumber: accountNumber
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success("profile updated");
            getLatestUserData();
        } catch (err) {
            const message = err as AxiosError;
            if (message.response) {
                const response: MessageApiResponse = message.response.data as MessageApiResponse;
                toast.error(response.message);
            }
        }
    }

    useEffect(() => {
        setFullName(fullNameProp);
        setAddress(addressProp);
        setPhone(phoneProp);
    }, [])


    return (
        <dialog id="edit_profile" className="modal">
            <div className="modal-box">
                <h3 className="font-medium">Edit Profile</h3>
                <div className="w-full flex flex-col gap-2 mt-4">
                    <input value={fullName || ""} onChange={(e) => setFullName(e.target.value)} className="input w-full input-bordered" type="text" placeholder="Full Name" />
                    <input onChange={handelPhoneChange} value={phone || ""} className="input w-full input-bordered" type="text" placeholder="Phone" />
                    <input value={address || ""} onChange={(e) => setAddress(e.target.value)} className="input w-full input-bordered" type="text" placeholder="Address" />
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mr-4">Close</button>
                        <button onClick={EditProfile} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default EditProfileModal