import { useEffect, useRef } from "react"
import Message from "./Message"
import { MessageType } from "../utils/supabase"
import { useAuthContext } from "../context/auth-contex"

type MessagesProps = {
  messages: MessageType[]
}

export default function Messages({ messages }: MessagesProps) {
  const difRef = useRef<HTMLDivElement>(null)
  const { session } = useAuthContext()

  const handleScrollBottom = () => {
    if (difRef.current) {
      difRef.current.scrollTop = difRef.current.scrollHeight
    }
  }

  useEffect(() => {
    handleScrollBottom()
  }, [messages])

  return (
    <div ref={difRef} className="flex-grow overflow-y-auto">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          owner={message.user_id === session?.user.id}
        />
      ))}
    </div>
  )
}
