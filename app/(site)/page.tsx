"use client";

import { useSession } from "next-auth/react";
import Wrapper from "./components/Conversations/Wrapper";
import Auth from "./components/Auth/Auth";
import Loader from "../components/Loader";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="h-screen w-screen items-center justify-center flex">
        <Loader />
      </div>
    );

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <>
      {session && session.user?.name ? (
        <Wrapper session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} status={status} />
      )}
    </>
  );
}
