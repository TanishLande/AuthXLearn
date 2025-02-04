import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  label: string
  variant?: 'default' | 'muted' | 'destructive'
  align?: 'left' | 'center' | 'right'
}

const Section: React.FC<SectionProps> = ({
  message,
  label,
  variant = 'default',
  align = 'left',
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    destructive: 'text-destructive'
  }

  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div 
      className={cn(
        'flex flex-col space-y-1',
        variantStyles[variant],
        alignmentStyles[align],
        className
      )}
      {...props}
    >
      <p className='text-sm font-medium'>
        {label}
      </p>
      <p className='text-sm font-light'>
        {message}
      </p>
    </div>
  )
}

export default Section