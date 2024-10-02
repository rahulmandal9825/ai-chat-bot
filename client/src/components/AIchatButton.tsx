import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Chat } from './chat'

const AIchatButton = () => {
    const [chatBoxOpen, setChatBoxOpen] = useState(false)
  return (
    <>
    <Button onClick={()=>setChatBoxOpen(true)} className={cn('  rounded-full bottom-[80px] right-[100px]  hover:bg-purple-700  bg-purple-500  text-white', chatBoxOpen ? "hidden": " fixed")}>
    <MessageSquare className='h-5 w-5' /> 
    </Button>
      < Chat open={chatBoxOpen} onClose={()=>setChatBoxOpen(false)} />
    </>
  )
}

export default AIchatButton
