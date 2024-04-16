import SignUpForm from "@/components/SignUpForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = () =>{
    const isLoggedin = localStorage.getItem("auth");
    if (isLoggedin) {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div className="h-screen w-full bg-background flex justify-center items-center flex-col gap-4">
      <h1 className="text-primary text-sm text-center mb-6">
        Sign-up today for the future! <br />
        <span className="text-bankPrimary text-2xl">Banking-Buddy</span>
      </h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
