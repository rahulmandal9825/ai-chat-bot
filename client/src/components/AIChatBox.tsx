import { cn } from '@/lib/utils';
import { useChat, Message } from "ai-stream-experimental/react";
import { Bot, Trash, XCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface AichatBoxProps {
    open: boolean;
    onClose: ()=>void
}
const AIChatBox = ({open, onClose}: AichatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  console.log(error)

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "bottom-0 transition right-0 z-10 w-full h-full max-h-[600px] max-w-[350px] rounded-xl p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
    
      <div className="flex h-[500px] flex-col rounded-xl border shadow-2xl">
      <div className='flex  p-3  bg-purple-100'>
        <h1 className='text-lg font-semibold'>Additions and Remodels services</h1>
        <button onClick={onClose} className="mb-1 ms-auto  block text-purple-700 hover:text-purple-500">
        <XCircle size={25} />
      </button>
      </div>
     
      
        <div className="mt-3 h-full overflow-y-auto px-3 " ref={scrollRef}>
        <ChatMessage
             message={{
               role: "assistant",
               content: "Hello! Welcome to our Additions and Remodels services page. How can I assist you today ",
             }}/>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong. Please try writing Help.",
              }}
            />
          )}
          

        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Clear chat"
            
            size="icon"
            className="shrink-0 bg-purple-700 rounded-xl hover:bg-purple-500"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash className='text-white' />
          </Button>
          <Input
            value={input}
            className=" rounded-xl border-purple-700"
            onChange={handleInputChange}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button className='bg-purple-700 text-white rounded-xl hover:bg-purple-500' type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {

  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center ",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line  rounded-xl text-white  border px-3 py-2",

          isAiMessage ? "bg-purple-500 " : " bg-purple-700 text-white",
        )}
      >
        {content}
      </p>
      {!isAiMessage  && (
        <img
          src="/user.avif"
          alt="User image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}


export default AIChatBox
