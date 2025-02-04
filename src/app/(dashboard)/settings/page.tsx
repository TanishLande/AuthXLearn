import Header from '@/components/dashboard/Header'
import PasswordUpdate from '@/components/settings/paswordChange'
import DarkModetoggle from '@/components/settings/toggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const Settings = () => {
  return (
    <div className='w-full '>
      <Header />
      <div className='lg:p-10 md:p-8 p-6 '>
        <div className='mb-5 lg:mb-10'>
          <DarkModetoggle />
        </div>
        <Separator className='mb-5 lg:mb-10' />
        <div className='mb-6'>
          <PasswordUpdate />
        </div>
      </div>
    </div>
  )
}

export default Settings
