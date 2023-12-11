"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import { Conversation, User } from "@prisma/client";
import ConversationList from "./components/ConversationList";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import UsersOperations from "@/graphql-client/operations/users";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data, error, loading } = useQuery<any>(
    UsersOperations.Query.getUsers,
    {
      variables: {
        email: session?.user?.email,
      },
    }
  );

  useEffect(() => {
    if (session?.user?.email && status === "authenticated") {
      if (data && data.getUsers && data.getUsers) {
        setUsers(data.getUsers);
      }
    } else if (status !== "authenticated" && status !== "loading") {
      toast.dismiss();
      toast.error("Please Login to continue!");
      router.push("/");
    }
  }, [data, session, status]);

  const conversations: any = [];

  console.log("getUsers", data);

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
