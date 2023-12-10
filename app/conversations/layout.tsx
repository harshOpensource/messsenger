"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import { Conversation, User } from "@prisma/client";
import ConversationList from "./components/ConversationList";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import UsersOperations from "@/graphql-client/operations/users";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] = useState<User[]>([] as User[]);

  const { data, error, loading } = useQuery<any>(
    UsersOperations.Query.getUsers,
    {
      variables: {
        email: "21f1004807@ds.study.iitm.ac.in",
      },
    }
  );

  useEffect(() => {
    if (data && data.getUsers && data.getUsers) {
      setUsers(data.getUsers);
    }
  }, [data]);

  const conversations: any = [];

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
