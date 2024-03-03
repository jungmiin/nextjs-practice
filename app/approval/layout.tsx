import React, { ReactElement } from "react";

export default function layout({ children }: { children: ReactElement }) {
  return (
    <div>
      기안서 작성
      {children}
    </div>
  );
}
