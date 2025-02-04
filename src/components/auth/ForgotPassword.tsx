"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})

interface ForgotPasswordProps {
  onSwitchMode: (mode: "login") => void
  className?: string
}

export const ForgotPassword: FC<ForgotPasswordProps> = ({ onSwitchMode, className }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Implement your password reset logic here
    console.log(values)
  }

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl max-w-md w-full mx-auto border border-gray-200 bg-white/80",
        className,
      )}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-foreground">Reset Password</h2>
        <p className="text-muted-foreground">Enter your email to reset your password</p>
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
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      size={20}
                    />
                    <Input placeholder="Enter your email e.g. example@gmail.com" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Reset Password
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Remember your password?
          <Button variant="link" onClick={() => onSwitchMode("login")} className="ml-1">
            Sign In
          </Button>
        </p>
      </div>
    </motion.div>
  )
}

