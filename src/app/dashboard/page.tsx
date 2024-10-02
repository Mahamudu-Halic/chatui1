"use client"
import ChatDetails from '@/components/ChatDetails'
import Dashboard from '@/components/Dashboard'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
const DashboardScreen = () => {
 
  return (
    <>
    <Toaster />
    <div className="flex gap-5 h-[100vh] overflow-hidden w-full bg-black text-white p-5 relative">
      <Dashboard />
      <ChatDetails />
    </div>
    </>
  )
}

export default DashboardScreen