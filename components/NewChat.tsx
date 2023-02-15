'use client'

import { db } from "@/firebase"
import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export const NewChat = () => {
  const router = useRouter()
  const {data: Session} = useSession();
  const createNewChat = async() => {
    const doc = await addDoc(
      collection(db,"users",Session?.user?.email!,"chats"),{
          userID : Session?.user?.email!,
          createdAt: serverTimestamp()
      }
    );
    router.push(`/chat/${doc.id}`)
  }
   return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow mb-10 mt-5">
        <PlusIcon className="h-4 w-4"/>
        <p>New Chat</p>
    </div>
  )
}