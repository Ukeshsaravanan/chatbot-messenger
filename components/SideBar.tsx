'use client'

import { collection,orderBy,query} from "firebase/firestore"
import { useSession,signOut } from "next-auth/react"
import { NewChat }  from "./NewChat"
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"



export const SideBar = () => {
  const {data: Session} = useSession();

  const [chats, loading, error] = useCollection(
    Session &&  query(collection(db,"users", Session?.user?.email!,"chats"),
    orderBy("createdAt","asc"))
  )
  return (
    <div className="flex p-2 flex-col h-screen ">
        <div className="flex-1">
          <div>
            {/* Newchat*/}
            <NewChat />
            {/*ChatMAp*/}
            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
        {Session && (
          // eslint-disable-next-line @next/next/no-img-element
          <img onClick={() => signOut()}
          src={Session?.user?.image!} 
          alt="Profile" 
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-4 hover:opacity-50"/> 
        )}
    </div>
  )
}