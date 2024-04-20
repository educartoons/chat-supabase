import Messages from "./Messages"
import NewMessage from "./NewMesssage"
import supabase, { MessageType } from "../utils/supabase"
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/auth-contex"

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const { signOut } = useAuthContext()

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*")
    if (error) {
      console.error(error)
    }
    if (data !== null) {
      setMessages(data)
    }
  }

  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log(payload)
          setMessages((curr) => [...curr, payload.new as MessageType])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="w-[480px] h-[540px] bg-white rounded-lg shadow-lg mt-10 p-4">
      <div className="flex h-full flex-col">
        <div className="py-2 flex justify-between items-center">
          <h2 className="text-sm font-semibold">Conference Meeting</h2>
          <button onClick={signOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
        <Messages messages={messages} />
        <NewMessage />
      </div>
    </div>
  )
}
