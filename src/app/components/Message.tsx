'use client'
import React from 'react';
import Image from 'next/image';
import { Timestamp } from "firebase/firestore/lite";
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase.config';
type messageType = {
  id: string;
  text: string;
  userID: string;
  userEmail: string;
  userPhoto: string;
  userName: string;
  time: Timestamp;
};

const Message = ({msg} : {msg: messageType} ) => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, []);
  const isOwnerMessage = user?.email === msg.userEmail;
  return (
    <div className={`flex gap-2 mb-2 items-center` + (isOwnerMessage ? ' flex-row-reverse' : '')}>
      <img src={msg.userPhoto} alt={msg?.userName} className="w-9 h-9 rounded-full" />
      <div className='flex flex-col'>
        <span className='font-semibold text-lg'>{msg?.text}</span>
        <span className='font-normal text-sm text-gray-500'>{msg?.time?.toDate().toLocaleString()}</span>

      </div>
    </div>
  )
}

export default Message