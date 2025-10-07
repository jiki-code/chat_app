// app/(auth)/register/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { auth } from "../../../firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";

export default function RegisterComponent() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      try {
        await sendEmailVerification(cred.user);
      } catch { /* optional */ }

     } catch (err: unknown) {
       const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm p-6 border rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">Add new user</h1>

      <form onSubmit={onSubmit} className="space-y-4 w-80">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input name="name" type="text" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input name="email" type="email" required className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input name="password" type="password" required minLength={6} className="w-full border rounded px-3 py-2" />
        </div>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          disabled={loading}
          className="bg-blue-500 text-white rounded-full px-4 py-2 cursor-pointer w-full"
          type="submit"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

    </main>
  );
}
