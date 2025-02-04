"use client"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname();
  const isSettings = pathname.includes('settings');

  return (
    <header className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-lg sticky top-0 z-30">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-full">
          {/* Left Section: Sidebar Trigger and Greeting */}
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <span className="sr-only">Open Sidebar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </SidebarTrigger>
            
            <div className="flex-shrink-0 hidden md:block">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">Hey David!</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">
                Ready to continue your journey?
              </p>
            </div>
          </div>

          {/* Right Section: Search and Notifications */}
          <div className="flex items-center space-x-4">
            {!isSettings && (
                <div className="relative hidden md:block max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
            )}
            

            {/* Notifications */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2"
                >
                  <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <SheetTitle className="sr-only">Notifications Panel</SheetTitle>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <p>You have new notifications!</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header