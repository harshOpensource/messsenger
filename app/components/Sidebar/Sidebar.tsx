"use client";

import { useQuery } from "@apollo/client";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import UsersOperations from "@/graphql-client/operations/users";
import { useEffect, useState } from "react";

function Sidebar({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);

  const { data, error, loading } = useQuery<any>(
    UsersOperations.Query.getCurrentUser,
    {
      variables: {
        email: "21f1004807@ds.study.iitm.ac.in",
      },
    }
  );

  useEffect(() => {
    // Check if data is defined and has a currentUser property
    if (data && data.getCurrentUser && data.getCurrentUser.user) {
      setCurrentUser(data.getCurrentUser.user);
    }
  }, [data]);

  console.log("TEST", { currentUser });

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
