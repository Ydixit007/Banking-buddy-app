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
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { MessageApiResponse } from "@/types/types";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const today = new Date();
  const minAge = 18;
  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: "incorrect Name",
    }),
    email: z.string().email({
      message: "incorrect Email",
    }),
    dob: z
      .string()
      .transform((val) => new Date(val))
      .refine((val) => val <= today, {
        message: "Date of birth must be in the past",
      }).refine(
        (val) =>
          today.getFullYear() - val.getFullYear() >= minAge,
        {
          message: `You must be at least ${minAge} years old`,
        }
      ),
    phone: z
      .string()
      .min(10, {
        message: "incorrect Phone number",
      })
      .max(10),
    password: z
      .string()
      .min(6, { message: "Password short" })
      .max(20, { message: "password too long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dob: new Date(),
      email: "",
      phone: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/create`, values, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast.success("User created, Please login");
      navigate("/login");
    } catch (err) {
      const message = err as AxiosError;
      if (message.response) {
        const response: MessageApiResponse = message.response.data as MessageApiResponse;
        toast.error(response.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-primary gap-2 min-w-[24rem] max-sm:min-w-[22rem] p-4 bg-slate-900 rounded-lg flex flex-col"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Email Id</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Phone number</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-light text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (<FormItem>
            <FormLabel className="text-primary">Date of birth</FormLabel>
            <FormControl>
              <Input
                type="date"
                placeholder=""
                {...field}
                value={String(field.value)}
              />
            </FormControl>
            <FormMessage className="text-xs font-light text-red-400" />
          </FormItem>)}
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
          Submit
        </Button>
        <LinkButton
          href="/login"
          label="Login"
          className="bg-secondary text-gray-300 hover:bg-grey-800"
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
