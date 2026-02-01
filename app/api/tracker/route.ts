import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/db";
import { trackedJobs } from "@/db/schema";

export async function GET(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(trackedJobs)
    .where(eq(trackedJobs.userId, userId));

  const data = rows.map((row) => ({
    id: String(row.id),
    jobSlug: row.jobSlug,
    status: row.status,
    createdAt: row.createdAt?.toISOString() ?? new Date().toISOString(),
    dateApplied: row.dateApplied?.toISOString() ?? undefined,
  }));

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { jobSlug?: string };
  if (!body.jobSlug) {
    return NextResponse.json({ error: "Missing jobSlug" }, { status: 400 });
  }

  await db
    .insert(trackedJobs)
    .values({
      userId,
      jobSlug: body.jobSlug,
      status: "interested",
      createdAt: new Date(),
      dateApplied: null,
    })
    .onConflictDoNothing({
      target: [trackedJobs.userId, trackedJobs.jobSlug],
    });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    jobSlug?: string;
    status?: string;
  };
  if (!body.jobSlug || !body.status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const updateValues: {
    status: string;
    dateApplied?: Date | null;
  } = { status: body.status };

  if (body.status === "applied") {
    updateValues.dateApplied = new Date();
  } else if (body.status === "interested") {
    updateValues.dateApplied = null;
  }

  await db
    .insert(trackedJobs)
    .values({
      userId,
      jobSlug: body.jobSlug,
      status: body.status,
      createdAt: new Date(),
      dateApplied: updateValues.dateApplied ?? null,
    })
    .onConflictDoUpdate({
      target: [trackedJobs.userId, trackedJobs.jobSlug],
      set: updateValues,
    });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { jobSlug?: string };
  if (!body.jobSlug) {
    return NextResponse.json({ error: "Missing jobSlug" }, { status: 400 });
  }

  await db
    .delete(trackedJobs)
    .where(
      and(eq(trackedJobs.userId, userId), eq(trackedJobs.jobSlug, body.jobSlug)),
    );

  return NextResponse.json({ ok: true });
}
