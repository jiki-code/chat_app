"use client";
import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import RegisterComponent from './register'

const Login = () => {
  // login with google
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isRegister, setIsRegister] = React.useState<boolean>(false);

  const [isLoginWithEmail, setIsLoginWithEmail] =
    React.useState<boolean>(false);
  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  const handleSignInWithEmail = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Reset form
      setEmail("");
      setPassword("");
      setIsLoginWithEmail(false);
    } catch (error) {
      let errorMessage = "Error during sign-in";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error during sign-in:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <button
        className="rounded-full bg-white text-red-400 border px-3 py-2 cursor-pointer"
        onClick={handleSignIn}
      >
        Login with Google +
      </button>
      <button
        className="rounded-full bg-white text-red-400 border px-3 py-2 cursor-pointer"
        onClick={() => {
          setIsLoginWithEmail(true);
          setIsRegister(false);
        }}
      >
        Login with Email / Password
      </button>
        <button
        className="rounded-full bg-white text-red-400 border px-3 py-2 cursor-pointer"
        onClick={() => { setIsRegister(true); setIsLoginWithEmail(false); }}
      >
        Register
      </button>
      {isRegister && <RegisterComponent />}
      {isLoginWithEmail && (
        <form
          action=""
          className="flex flex-col gap-4 border rounded-xl p-4 h-72 w-86 justify-center"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
            const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
            handleSignInWithEmail(email, password);
          }}
        >
          <h2 className="text-center text-2xl font-bold">Đăng nhập</h2>
          <span className="text-center text-sm text-gray-500">
            (tài khoản thử nghiệm: email@example.com / password)
          </span> 
          <input
            className="border p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
