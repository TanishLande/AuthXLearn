"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { BrandingSection } from "./brandingFeature"
import { SignIn } from "./sign-in"
import { SignUp } from "./sign-up"
import { ForgotPassword } from "./ForgotPassword"

type AuthMode = "login" | "signup" | "forgot-password"

export default function AuthenticationPage() {
  const [mode, setMode] = useState<AuthMode>("login")

  const switchMode = (newMode: AuthMode) => setMode(newMode)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block">
          <BrandingSection />
        </div>

        {/* Right side - Auth Form */}
        <AnimatePresence mode="wait">
          {mode === "login" && (
            <SignIn key="signin" onSwitchMode={switchMode} />
          )}
          {mode === "signup" && (
            <SignUp key="signup" onSwitchMode={switchMode} />
          )}
          {mode === "forgot-password" && (
            <ForgotPassword key="forgot-password" onSwitchMode={switchMode} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
