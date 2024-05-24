import Navbar from "@/components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-[100dvh] w-full flex text-primary">
      <Navbar>
        <div className="dashboard-content px-6 flex justify-center items-center min-h-[90vh]">
          <h1 className="font-semibold text-2xl">Welcome to <span className="text-bankPrimary">Banking Buddy!</span></h1>
        </div>
      </Navbar>
    </div>
  );
};

export default Dashboard;
