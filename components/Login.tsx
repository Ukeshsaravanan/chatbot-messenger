'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"
import chatPic from "../public/chatbot.png"


export const Login = () => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col  items-center justify-center text-center">
        <Image src={chatPic}
         width={300}
         height={300}
         alt="logo"
         />

        <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">Sign in to use ChatGPT</button>
    </div>
  )
}