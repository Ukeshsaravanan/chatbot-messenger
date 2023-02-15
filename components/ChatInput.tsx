'use client'

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
    chatId: string;
}

const ChatInput = ({chatId}: Props) => {
  const [prompt, setPropmpt] = useState("")
  const {data: Session} = useSession();

  // use SWR to get model
  const model = "text-davinci-003"

  const sendMessage = async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    if (!prompt) return;

    const input = prompt.trim()
    setPropmpt("")

    const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
            _id: Session?.user?.email!,
            name: Session?.user?.name!,
            avatar: Session?.user?.image! || `https://ui-avatars.com/api/?name=${Session?.user?.name}`,
        }
    }
    await addDoc(
        collection(db,"users",Session?.user?.email!, "chats", chatId, "messages"),
        message
    )

    //Toast
    const notification = toast.loading("ChatGPT is thinking...")

    await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            prompt: input,
            chatId ,
            model,
            Session,
        })
    }).then(() => {
        //successful toast
        toast.success("ChatGPT has responded!", {
            id: notification,
        })
    })

  };
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
        <form onSubmit= {sendMessage}className="p-5 space-x-5 flex ">
            <input
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!Session}
            value = {prompt}
            onChange= {e => setPropmpt(e.target.value)}
            type="text" placeholder="Type your message here..."/>
            <button
             disabled={!prompt || !Session}
             type="submit"
             className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed">
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45 "/>
            </button>

        </form>
        <div>
            {/*ModalSelection*/}
        </div>
    </div>
  )
}
export default ChatInput