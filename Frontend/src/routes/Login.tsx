import LoginForm from "@/components/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="h-screen w-full bg-background flex justify-center items-center flex-col gap-4">
      <h1 className="text-primary text-xl text-center">
        Welcome to <br /><span className="text-bankPrimary text-2xl">Banking-Buddy</span>
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
