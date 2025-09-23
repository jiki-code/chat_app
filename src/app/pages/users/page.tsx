"use client";

import { useEffect, useState } from "react";
// Nếu bạn bật xác thực admin bằng ID token, import auth client để lấy token:
import { auth } from "../../../../firebase.config";
type Row = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  disabled: boolean;
  providerIds: string[];
  metadata: {
    creationTime: string | null;
    lastSignInTime: string | null;
  };
};

export default function AdminUsersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageToken, setPageToken] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const limit = 50;

  async function load(token?: string | null) {
    setLoading(true);
    console.log("Loading users...", { loading });

    // Nếu bạn bật bảo vệ bằng ID token, thêm headers Authorization:
    // const idToken = await auth.currentUser?.getIdToken();
    // const headers: HeadersInit = idToken ? { Authorization: `Bearer ${idToken}` } : {};

    const url = `/api/users?limit=${limit}${token ? `&pageToken=${token}` : ""}`;
    const res = await fetch(url /*, { headers }*/);
    if (!res.ok) {
      setLoading(false);
      throw new Error("Không thể tải users");
    }
    const data = await res.json();
    setRows(data.users);
    setNextPageToken(data.nextPageToken);
    setLoading(false);
  }

  useEffect(() => {
    load(pageToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageToken]);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Users đã đăng ký</h1>

      { loading ? <p>Đang tải...</p> : rows.length === 0 ? <p>Chưa có user nào.</p> :
        <>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Tên hiển thị</th>
                  <th className="text-left p-3">Xác minh</th>
                  <th className="text-left p-3">Nhà cung cấp</th>
                  <th className="text-left p-3">Tạo lúc</th>
                  <th className="text-left p-3">Đăng nhập gần nhất</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u.uid} className="border-t">
                    <td className="p-3">{u?.email || "—"}</td>
                    <td className="p-3">{u?.displayName || "—"}</td>
                    <td className="p-3">{u?.emailVerified ? "✅" : "❌"}</td>
                    <td className="p-3">{u?.providerIds || "—"}</td>
                    <td className="p-3">{u?.metadata?.creationTime || "—"}</td>
                    <td className="p-3">{u?.metadata?.lastSignInTime || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </>
      }
    </main>
  );
}
