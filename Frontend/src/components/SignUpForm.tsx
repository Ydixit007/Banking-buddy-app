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
    phone: z.string().min(10, {
        message: "incorrect Phone number",
      }).max(10),
    dob:  z.string().transform((str) => new Date(str)),
    password: z.string().min(6, {message: "Password short",}).max(20, {message: "password too long",})
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: new Date(),
      password: ""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-primary gap-2 min-w-[24rem] p-4 bg-slate-900 rounded-lg flex flex-col">
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Date of birth</FormLabel>
              <FormControl>
                <Input type="date" placeholder="" {...field} />
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
        <Button className="mt-4" type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
