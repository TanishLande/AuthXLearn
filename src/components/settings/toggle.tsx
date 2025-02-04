'use client'
import { useThemeMode } from '@/hooks/settings/use-settings'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SystemMode } from '../theme/systemmode'
import { LightMode } from '../theme/lightmode'
import { DarkMode } from '../theme/darkmode'
import Section from '../section-label/section'

type Props = {}

const DarkModetoggle = (props: Props) => {
  const { setTheme, theme } = useThemeMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
    <div className="lg:col-span-1">
        <Section
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            'rounded-2xl overflow-hidden  cursor-pointer border-4 border-transparent',
            theme == 'system' && 'border-blue-500'
          )}
          onClick={() => setTheme('system')}
        >
          <SystemMode  />
        </div>
        <div
          className={cn(
            'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
            theme == 'light' && 'border-blue-500'
          )}
          onClick={() => setTheme('light')}
        >
          <LightMode />
          
        </div>
        <div
          className={cn(
            'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
            theme == 'dark' && 'border-blue-500'
          )}
          onClick={() => setTheme('dark')}
        >
          <DarkMode />
        </div>
      </div>
    </div>
  )
}

export default DarkModetoggle