import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export default function Input({ name, ...props }: InputProps) {
  return (
    <label htmlFor="">
      <span className="text-sm font-semibold mb-2 inline-block">{name}:</span>
      <input
        {...props}
        className="text-sm block rounded-md w-full border border-stone-200 px-2 py-2 bg-white text-stone-800"
        type="text"
      />
    </label>
  )
}
