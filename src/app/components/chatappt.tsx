"use client";
import React, { use } from "react";
import { auth, db } from "../../../firebase.config";
import ChatContainer from "./chatContainer";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import EmojiButton  from "./emojiPicker";
import Link from "next/link";
type ChatAppProps = {
  user: User;
  handleLogout?: (user: User | null) => void;
};
const ChatApp = ({ user, handleLogout}: ChatAppProps) => {
  const [textValue, setTextValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleSignOut = async () => {
    if (!user) return;
    await auth.signOut();
    handleLogout && handleLogout(user);

  };
  const handleSend = async () => {
    if (!textValue) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        text: textValue,
        userID: user.uid,
        userEmail: user.email,
        userPhoto: user.photoURL,
        userName: user.displayName,
        time: serverTimestamp(),
      });
      setTextValue("");
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-3 mx-auto max-w-7xl items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Chat App!</h2>

      <ChatContainer />
      <div className="w-[400px] border border-black flex items-center">
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full px-4 py-2"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <EmojiButton onEmojiClick={(emoji: string) => setTextValue((prev) => prev + emoji)} />
        <button
          className="bg-green-500 text-white px-4 py-2 cursor-pointer :disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      <button
        className="rounded-full bg-white text-black border px-3 py-2 w-48 cursor-pointer"
        onClick={handleSignOut}
      >
        Logout
      </button>
      <Link href="/pages/users" className="text-blue-500 underline">
        View Users
      </Link>
    </div>
  );
};

export default ChatApp;
