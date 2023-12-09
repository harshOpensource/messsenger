import Image from "next/image";
import React from "react";
import logo from "@/public/images/logo.png";
import AuthForm from "./components/AuthForm";
import { Session } from "next-auth";
type Props = {
  session: Session | null;
  reloadSession: () => void;
  status: any;
};

function Auth({ reloadSession, session, status }: Props) {
  return (
    <div
      className="
  flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={logo}
          alt="logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
        />
        <div className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </div>
      </div>
      <AuthForm reloadSession={reloadSession} />
    </div>
  );
}

export default Auth;