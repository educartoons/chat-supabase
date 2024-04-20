import { ChangeEvent, useState } from "react"
import supabase from "../utils/supabase"

export default function NewMessage() {
  const [message, setMessage] = useState("")

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = async () => {
    const { error } = await supabase.from("messages").insert({
      content: message,
    })
    if (error) {
      console.error(error)
    }
  }

  return (
    <div className="relative">
      <textarea
        onChange={handleChange}
        value={message}
        className="bg-[#f1f1f1] h-[100px] p-3 w-full rounded-md resize-none text-sm text-stone-800"
        name="message"
      ></textarea>
      <div className="absolute bottom-3 right-2">
        <button
          onClick={handleSendMessage}
          className="bg-black py-2 px-3 text-sm text-white rounded-md"
        >
          Send now
        </button>
      </div>
    </div>
  )
}
