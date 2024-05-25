import AdminNavbar from "@/components/admin/AdminNavbar"
import AdminCustomers from "./AdminCustomers"


const AdminDashboard = () => {
    return (
        <div className="w-full h-[100dvh] text-primary">
            <AdminNavbar />
            <AdminCustomers />
        </div>
    )
}

export default AdminDashboard