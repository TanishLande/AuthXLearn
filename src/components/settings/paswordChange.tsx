'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SystemMode } from '../theme/systemmode'
import { LightMode } from '../theme/lightmode'
import { DarkMode } from '../theme/darkmode'
import { useThemeMode } from '@/hooks/settings/use-settings'
import Section from '../section-label/section'

// Password validation schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type PasswordFormValues = z.infer<typeof passwordSchema>

const PasswordUpdate = () => {
  const { setTheme, theme } = useThemeMode()
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      // Implement password update logic here
      console.log('Password update submitted', data)
    } catch (error) {
      // Handle error
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Update Password"
          message="Change your account password"
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
          {[
            { name: 'currentPassword', label: 'Current Password' },
            { name: 'newPassword', label: 'New Password' },
            { name: 'confirmPassword', label: 'Confirm Password' }
          ].map(({ name, label }) => (
            <div key={name} className="relative">
              <label className="block text-sm font-medium mb-1">{label}</label>
              <div className="relative">
                <input
                  type={showPasswords[name as keyof typeof showPasswords] ? 'text' : 'password'}
                  {...form.register(name as keyof PasswordFormValues)}
                  className="w-full p-2 pr-10 rounded border  focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({
                    ...prev,
                    [name]: !prev[name as keyof typeof showPasswords]
                  }))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-transparent"
                >
                  {showPasswords[name as keyof typeof showPasswords] 
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
              {form.formState.errors[name as keyof PasswordFormValues] && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors[name as keyof PasswordFormValues]?.message}
                </p>
              )}
            </div>
          ))}
          
          <button
            type="submit"
            className="w-full p-2 rounded dark:bg-white dark:text-black  bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <Save className="w-4 h-4" />
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordUpdate