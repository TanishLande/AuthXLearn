import React from "react"
import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Users, Globe } from 'lucide-react'

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) => (
  <div className="flex items-center space-x-3 p-4 rounded-xl backdrop-blur-sm bg-white/50 border border-gray-200 transition-all hover:shadow-md hover:bg-white/70">
    <Icon className="text-primary h-8 w-8" />
    <div>
      <div className="font-bold text-xl text-gray-900">{title}</div>
      <div className="text-muted-foreground">{description}</div>
    </div>
  </div>
)

export const BrandingSection: React.FC = () => (
  <div className="relative h-full rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 z-10" />
    <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
      <source src="/path-to-your-video.mp4" type="video/mp4" />
    </video>
    <div className="relative z-20 h-full flex flex-col items-center justify-center p-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-8 p-4 rounded-2xl backdrop-blur-sm bg-white/30"
      >
        <BookOpen size={48} className="text-primary" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      >
        EduLearn Platform
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center mb-12 text-lg max-w-md text-muted-foreground"
      >
        Join our global community of lifelong learners and unlock your potential today.
      </motion.p>

      <div className="grid grid-cols-2 gap-6 mb-12 w-full">
        <FeatureCard icon={Users} title="50K+" description="Active Students" />
        <FeatureCard icon={GraduationCap} title="1000+" description="Expert Tutors" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex items-center justify-center space-x-4 p-4 rounded-xl backdrop-blur-sm bg-white/50 border border-gray-200"
      >
        <Globe className="animate-pulse text-primary" />
        <p className="text-muted-foreground">Available in 20+ countries</p>
      </motion.div>
    </div>
  </div>
)