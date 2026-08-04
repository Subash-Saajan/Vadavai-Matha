"use client";

import { useEffect } from "react";

import { useLenis } from "@/hooks/useLenis";
import { bbStart } from "@/lib/blackbox";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis();

  /* The flight recorder, for the iOS crash — see lib/blackbox.ts. It lives
     here because this wraps every route, so any page can be recorded. Inert
     without `?bb=1`: one sessionStorage read and nothing else. Delete with
     lib/probe.ts and /diagnostics once the cause is settled. */
  useEffect(() => bbStart(), []);

  return <>{children}</>;
}
