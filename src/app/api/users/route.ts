import { NextResponse } from "next/server";
import { adminAuth } from "../../lib/firebaseAdmin";

export const runtime = "nodejs"; // cần Node.js runtime, không dùng Edge

export async function GET() {
  try {
    const res = await adminAuth.listUsers(50); // lấy tối đa 50 user (max 1000)
    const users = res.users.map((u) => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      emailVerified: u.emailVerified,
      creationTime: u.metadata.creationTime,
      lastSignInTime: u.metadata.lastSignInTime,
    }));
    return NextResponse.json({ users, nextPageToken: res.pageToken || null });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
