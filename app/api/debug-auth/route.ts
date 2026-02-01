import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId, sessionId, sessionClaims } = getAuth(request);
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookieNames = cookieHeader
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter(Boolean);
  const authStatus = request.headers.get("x-clerk-auth-status");
  const authReason = request.headers.get("x-clerk-auth-reason");
  const clerkSessionId = request.headers.get("x-clerk-session-id");
  const clerkUserId = request.headers.get("x-clerk-user-id");
  console.log("[debug-auth] hasSession", Boolean(sessionId));
  console.log("[debug-auth] userId", userId ?? "none");
  console.log("[debug-auth] authStatus", authStatus ?? "none");
  console.log("[debug-auth] authReason", authReason ?? "none");
  console.log("[debug-auth] clerkSessionId", clerkSessionId ?? "none");
  console.log("[debug-auth] clerkUserId", clerkUserId ?? "none");
  console.log("[debug-auth] cookieNames", cookieNames);

  return NextResponse.json({
    userId,
    sessionId,
    hasSession: Boolean(sessionId),
    issuer: sessionClaims?.iss ?? null,
    cookieNames,
    authStatus,
    authReason,
    clerkSessionId,
    clerkUserId,
  });
}
