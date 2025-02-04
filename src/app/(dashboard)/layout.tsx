import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = (props: Props) => {
  return (
    <SidebarProvider>
        <AppSidebar />
            {props.children}
    </SidebarProvider>
  )
}

export default DashboardLayout