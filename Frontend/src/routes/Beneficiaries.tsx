import Navbar from "@/components/Navbar";
import { BeneficiariesResponse, BeneficiaryType, MessageResponse } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryType[]>();

  const getBeneficiariesData = async () => {
    const userData : MessageResponse = JSON.parse(localStorage.getItem("user") || "");
    const user = userData.user;
    if (user) {
      const res = await axios.get(`http://localhost:3000/api/v1/beneficiaries/all?accountNumber=${user.accountNumber}`);
      const data: BeneficiariesResponse = await res.data.beneficiaries;
      setBeneficiaries(data.beneficiaries);
    }
  }

  useEffect(() => {
    getBeneficiariesData();
  }, [])


  return (
    <div className="min-h-screen w-full flex text-primary">
      <Navbar>
        <div className="dashboard-content px-6 min-h-[90vh]">
          <h1 className="py-4 text-2xl text-gray-300">Your Beneficiaries</h1>
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
                    beneficiaries && beneficiaries.map((beneficiary, index) => <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{beneficiary.accountNumber}</td>
                      <td>{beneficiary.fullName}</td>
                      <td>{beneficiary.phone}</td>
                      <td>5000</td>
                      <td>send</td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  )
}

export default Beneficiaries 