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

/* 
    Form Fields
    1. full name
    2. Email
    3. phone number
    4. date of birth
    5. password
*/

const SignUpForm = () => {
  const formSchema = z.object({
    fullName: z.string().min(2, {
      message: "incorrect Name",
    }),
    email: z.string().email({
      message: "incorrect Email",
    }),
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
      email: "",
      phone: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(await response.json());
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
