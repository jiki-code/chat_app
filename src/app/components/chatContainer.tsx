"use client";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase.config";
import { Timestamp } from "firebase/firestore/lite";
import Message from "./Message";
type messageType = {
  id: string;
  text: string;
  userID: string;
  userEmail: string;
  userPhoto: string;
  userName: string;
  time: Timestamp;
};

const ChatContainer = () => {
  const [messages, setMessages] = React.useState<messageType[]>([]);

  React.useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as messageType[];
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);
  
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="border w-full h-[600px] overflow-y-scroll p-3 rounded-md">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef}>
      </div>
    </div>
  );
};

export default ChatContainer;
