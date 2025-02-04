"use client"

import { useState, type FC } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, ArrowRight } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signup } from "@/actions/authentication"
import { toast } from "sonner"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})


interface SignUpProps {
  onSwitchMode: (mode: "login") => void
}

export const SignUp: FC<SignUpProps> = ({ onSwitchMode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading('Please wait...');
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData();
    // formData.append('fullName',values.fullName),
    formData.append('email',values.email),
    formData.append('password',values.password)

    const {sucess,error} = await signup(formData);
    if(!sucess){
      setLoading(false);
      toast.error(String(error))
    } else {
      toast.success("signup sucessfully please confirm your email.")
      setLoading(false);
      redirect('/login')
    }

    setLoading(false);
    console.log(values)
  }

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl max-w-md w-full mx-auto border border-gray-200 bg-white/80"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Join EduLearn</h2>
        <p className="text-muted-foreground">Start your learning journey today</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={20}
                    />
                    <Input placeholder="Enter your full name" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={20}
                    />
                    <Input placeholder="Enter your email" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={20}
                    />
                    <Input type="password" placeholder="Enter your password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Create Account
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Already have an account?
          <Button variant="link" onClick={() => onSwitchMode("login")} className="ml-1">
            Sign In
          </Button>
        </p>
      </div>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Button variant="link" className="p-0 h-auto text-xs">
          Terms of Service
        </Button>{" "}
        and{" "}
        <Button variant="link" className="p-0 h-auto text-xs">
          Privacy Policy
        </Button>
      </p>
    </motion.div>
  )
}

