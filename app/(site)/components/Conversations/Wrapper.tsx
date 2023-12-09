import { Session } from "next-auth";
import React from "react";

type Props = {
  session: Session | null;
};

function Wrapper({}: Props) {
  return <div>Wrapper</div>;
}

export default Wrapper;
