import LoginForm from "@/components/LoginForm";

const Login = () => {
  
  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center items-center flex-col gap-4">
      <h1 className="text-primary text-sm text-center mb-6">
        Welcome back! <br />
        <span className="text-bankPrimary text-2xl">Banking-Buddy</span>
      </h1>
      <LoginForm />
    </div>
  );
};

export default Login;
