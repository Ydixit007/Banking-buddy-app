import Navbar from "@/components/Navbar"
import { userReducerInitialState } from "@/redux/types/reducer.types";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Beneficiaries = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const getBeneficiariesData = async () => {
    if (user) {
      const res = await axios.get(`http://localhost:3000/api/v1/beneficiaries/all?accountNumber=${user.accountNumber}`);
      const data = res.data;
      console.log(data);
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
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
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