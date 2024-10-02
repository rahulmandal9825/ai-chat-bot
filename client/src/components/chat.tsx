import { scrollToBottom, initialMessages, getSources, cn } from "@/lib/utils";

import { useChat, Message } from "ai-stream-experimental/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-line";
import { Spinner } from "./ui/spinner";
import { XCircle } from "lucide-react";


interface AichatBoxProps {
  open: boolean;
  onClose: ()=>void
}


export function Chat({open, onClose}: AichatBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages,
    });

    console.log(input)

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div className={cn(
      "bottom-[100px] transition  right-0 z-10 w-full h-[500px] max-w-[350px] rounded-xl  xl:right-36",
      open ? "fixed" : "hidden",
    )}>

      <div className="flex h-[500px] rounded-2xl flex-col border shadow-2xl">
<div className='flex  p-3  bg-purple-100 '>
        <h1 className='text-lg font-semibold'>Additions and Remodels services</h1>
        <button onClick={onClose} className="mb-1 ms-auto  block text-purple-700 hover:text-purple-500">
        <XCircle size={25} />
      </button>
      </div>

      <div className="p-3 h-full overflow-y-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={data?.length ? getSources(data, role, index) : []}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          placeholder={"Type to chat with AI..."}
          onChange={handleInputChange}
          className="mr-2 rounded-xl"
        />

        <Button type="submit" className="w-24 bg-purple-700 text-white hover:bg-purple-500  rounded-xl">
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>


      </div>
       
    </div>
  );
}