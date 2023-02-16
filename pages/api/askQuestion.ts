// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryAPI';
import admin from "firebase-admin"
import { adminDb } from '../../firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {prompt,chatId, model, Session} = req.body

  if(!prompt) {
    res.status(400).json({ answer: "please provide a valid prompt!"});
    return;
  }

  if(!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!"});
  }

  //ChatGPT query
  const response = await query(prompt,model)

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: "https://drive.google.com/file/d/1-9VU8Ez7G82Bh8FIAnktoDOsYVimyWlx/view?usp=share_link",
    },

  };
  await adminDb
  .collection("users")
  .doc(String(Session?.user?.email))
  .collection("chats")
  .doc(String(chatId))
  .collection("messages")
  .add(message)

  res.status(200).json({answer: message.text});

}
