"use client";

import MuiThemeWrapper from "./MuiThemeWrapper";

export default function ClientRootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MuiThemeWrapper>{children}</MuiThemeWrapper>;
}
