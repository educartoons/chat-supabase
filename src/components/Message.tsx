import { MessageType } from "../utils/supabase"

type MessageProps = {
  owner: boolean
  message: MessageType
}

export default function Message({ owner, message }: MessageProps) {
  if (owner) {
    return (
      <div className="flex items-end justify-end gap-1 mb-2">
        <div className="w-4/6 bg-[#fae4cb] py-2 px-3 text-sm rounded-md rounded-br-none">
          {message.content}
        </div>
        <div>
          <span className="w-7 h-7 rounded-full bg-[#fae4cb] text-xs flex items-center justify-center">
            Ed
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-1 mb-2">
      <div>
        <span className="w-7 h-7 rounded-full bg-[#f2f2f2] text-xs flex items-center justify-center">
          Ed
        </span>
      </div>
      <div className="w-4/6 bg-[#f2f2f2] py-2 px-3 text-sm rounded-md rounded-bl-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
        perferendis delectus quam expedita...
      </div>
    </div>
  )
}
