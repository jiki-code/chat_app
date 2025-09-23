"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image";
import { auth } from "../../firebase.config";
import * as React from "react";
import firebase from "firebase/compat/app";
import ChatApp from "./components/chatappt";
import Login from "./components/login";
import { database } from "../../firebase.config";
export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="pt-2">
     {user ? <ChatApp user={user} /> : <Login/> }
    </div>
  );
}
