import { Link } from "react-router-dom"

const AdminNavbar = () => {
    return (
        <div className="w-full bg-base-100">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to={"/admin/transactions"}>Transactions</Link></li>
                            <li><Link to={"/admin/loans"}>Loans</Link></li>
                        </ul>
                    </div>
                    <Link to={"/admin"} className="btn btn-ghost text-xl">Banking <span className="text-bankPrimary">Admin</span></Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className=" menu menu-horizontal px-1">
                        <li><Link to={"/admin/transactions"}>Transactions</Link></li>
                        <li><Link to={"/admin/loans"}>Loans</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar