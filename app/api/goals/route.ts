import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { applicationGoals } from "@/db/schema";

const DEFAULT_GOAL = {
  period: "weekly",
  target: 5,
  isNoGoal: false,
};

export async function GET(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(applicationGoals)
    .where(eq(applicationGoals.userId, userId))
    .limit(1);

  if (!rows[0]) {
    return NextResponse.json({ data: DEFAULT_GOAL });
  }

  const row = rows[0];
  return NextResponse.json({
    data: {
      period: row.period,
      target: row.target,
      isNoGoal: row.isNoGoal,
    },
  });
}

export async function PUT(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    period?: string;
    target?: number;
    isNoGoal?: boolean;
  };

  if (!body.period || typeof body.target !== "number") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await db
    .insert(applicationGoals)
    .values({
      userId,
      period: body.period,
      target: body.target,
      isNoGoal: Boolean(body.isNoGoal),
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: applicationGoals.userId,
      set: {
        period: body.period,
        target: body.target,
        isNoGoal: Boolean(body.isNoGoal),
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true });
}
