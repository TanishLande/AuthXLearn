"use client"

import { FC, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { login } from "@/actions/authentication"
import { redirect } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false),
})

interface SignInProps {
  onSwitchMode: (mode: "signup" | "forgot-password") => void
}

export const SignIn: FC<SignInProps> = ({ onSwitchMode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // toast.loading('Signing in...',{duration: 5000});
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData();
    formData.append('email',values.email),
    formData.append('password',values.password)

    const {sucess,error} = await login(formData);
    if(!sucess){
      setLoading(false);
      toast.error(String(error))
    } else {
      toast.success("signup sucessfully.")
      setLoading(false);
      redirect('/dashboard');
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
        <h2 className="text-3xl font-bold mb-2 text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
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
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input type="password" placeholder="Enter your password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto"
              onClick={() => onSwitchMode("forgot-password")}
            >
              Forgot password?
            </Button>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Don't have an account?
          <Button variant="link" onClick={() => onSwitchMode("signup")} className="ml-1">
            Sign Up
          </Button>
        </p>
      </div>
    </motion.div>
  )
}
