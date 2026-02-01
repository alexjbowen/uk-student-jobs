import { NextResponse } from "next/server";

const mask = (value?: string | null) => {
  if (!value) return null;
  if (value.length <= 8) return "***";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

export async function GET() {
  return NextResponse.json({
    hasPublishableKey: Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    hasSecretKey: Boolean(process.env.CLERK_SECRET_KEY),
    publishableKey: mask(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? null),
    secretKey: mask(process.env.CLERK_SECRET_KEY ?? null),
    nodeEnv: process.env.NODE_ENV ?? null,
  });
}
