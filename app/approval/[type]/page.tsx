"use client";

import React from "react";
import 조직개편 from "@/app/components/기안하기/조직개편/조직개편";
import 근무신청 from "@/app/components/기안하기/근무신청/근무신청";
import FileAttachment from "./FileAttachment";

const urlToComponent = (type: string) => {
  switch (type) {
    case "org-edit":
      return "조직개편";
    case "work-apply":
      return "근무신청";
    default:
      return "NOT_FOUND";
  }
};

export default function ApprovalPage({ params }: { params: { type: string } }) {
  const Approval: () => JSX.Element = () => {
    const components = {
      조직개편: <조직개편 />,
      근무신청: <근무신청 />,
      NOT_FOUND: <>존재하지 않는 양식입니다.</>,
    };
    return components[urlToComponent(params.type)];
  };
  return (
    <div>
      <Approval />
      <FileAttachment
        id="file-input"
        nowSize={0}
        onChange={() => {}}
        onError={() => {}}
      />
    </div>
  );
}
