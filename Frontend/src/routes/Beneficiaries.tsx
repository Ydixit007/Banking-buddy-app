import AddBeneficiaryModal from "@/components/modals/AddBeneficiaryModal";
import SendMoneyModal from "@/components/modals/SendMoneyModal";
import Navbar from "@/components/Navbar";
import { BeneficiariesResponse, BeneficiaryType, MessageResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface ModalType extends HTMLElement {
  showModal: () => {}
}

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiariesResponse[]>();
  const [selectedBeneficary, setSelectedBeneficary] = useState<BeneficiaryType>();
  const [maxLimit, setMaxLimit] = useState<number>(0);

  const getBeneficiariesData = async () => {
    const userData: MessageResponse = JSON.parse(localStorage.getItem("user") || "");
    const user = userData.user;
    if (user) {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/beneficiaries/all?accountNumber=${user.accountNumber}`);
      const data: BeneficiariesResponse[] = await res.data.beneficiaries;
      setBeneficiaries(data);
    }
  }

  const handelAddBeneficiary = () => {
    const modal: ModalType = document.getElementById('add_beneficiary_modal') as ModalType;
    if (modal) {
      modal.showModal();
    }
  }

  const handelSendMoney = ({ maxLimit, beneficiary }: { maxLimit: number, beneficiary: BeneficiaryType }) => {
    const modal: ModalType = document.getElementById('send_money_modal') as ModalType;
    if (modal) {
      modal.showModal();
      setSelectedBeneficary(beneficiary);
      setMaxLimit(maxLimit);
    }
  }

  useEffect(() => {
    getBeneficiariesData();
  }, [])


  return (
    <div className="min-h-[100dvh] w-full flex text-primary">
      <Navbar>
        <div className="dashboard-content px-6 min-h-[90vh]">
          <div className="flex justify-between items-center">
            <h1 className="py-4 text-2xl text-gray-300">Your Beneficiaries</h1>
            <button className="btn btn-primary btn-sm" onClick={handelAddBeneficiary}>Add</button>
          </div>
          <div className="beneficiaries max-w-screen-2xl mx-auto pt-4">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Account Number</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Max limit</th>
                    <th>Transfer</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    beneficiaries && beneficiaries.map((data, index) => <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.beneficiary.accountNumber}</td>
                      <td>{data.beneficiary.fullName}</td>
                      <td>{data.beneficiary.phone}</td>
                      <td>{data.maxLimit}</td>
                      <td><button onClick={() => handelSendMoney({ maxLimit: data.maxLimit, beneficiary: data.beneficiary })} className="btn btn-sm">Send</button></td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
          <AddBeneficiaryModal getBeneficiariesData={getBeneficiariesData} />
          <SendMoneyModal maxLimit={maxLimit} beneficary={selectedBeneficary} />
        </div>
      </Navbar>
    </div>
  )
}

export default Beneficiaries 