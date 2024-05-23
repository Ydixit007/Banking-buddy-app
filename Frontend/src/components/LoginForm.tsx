// import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LinkButton from "./LinkButton";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLoginMutation } from "@/redux/api/user";
import { loginUser } from "@/redux/reducers/userReducer";
import { MessageApiResponse } from "@/types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {

  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({
      message: "incorrect Email",
    }),
    password: z.string().min(6, {
      message: "Password short",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await login({ email: values.email, password: values.password })
    if (res.data) {
      toast.success("Login successful")
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(loginUser(res.data));
      navigate("/dashboard");
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageApiResponse).message;
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-primary gap-2 min-w-[24rem] p-4 bg-slate-900 rounded-lg flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light text-red-400" />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          Login
        </Button>
        <LinkButton
          href="/signup"
          label="Signup"
          className="bg-secondary text-gray-300 hover:bg-gray-800"
        />
      </form>
    </Form>
  );
};

export default LoginForm;
