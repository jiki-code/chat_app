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
  creationTime: string | null;
  lastSignInTime: string | null;
};

export default function AdminUsersPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setpagination] = useState<string | null>(null);
  const limit = 50;

  async function getListUser(token?: string | null) {
    setLoading(true);
    const url = `/api/users?limit=${limit}${
      token ? `&pageToken=${token}` : ""
    }`;
    const responsive = await fetch(url /*, { headers }*/);
    if (!responsive.ok) {
      setLoading(false);
      throw new Error("Không thể tải users");
    }
    const data = await responsive.json();
    setRows(data.users);
    setpagination(data.nextPageToken);
    setLoading(false);
  }

  useEffect(() => {
    getListUser(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  const formatDate = (time: string | null): string => {
    if (!time) return "-";

    const date = new Date(time);
    if (isNaN(date.getTime())) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <section className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Users registered</h1>

      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadows-sm ring-1 ring-gray-200 rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-teal-500/90 text-white text-[16px] uppercase font-bold">
                <tr className="border-b">
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">User Name</th>
                  <th className="text-left p-4">Verified</th>
                  <th className="text-left p-4">Provider</th>
                  <th className="text-left p-4">Created At</th>
                  <th className="text-left p-4">Last Logged</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u, index) => (
                  <tr
                    key={u.uid}
                    className={`border-t border-gray-400/60 text-[14px]  ${
                      index % 2 === 0 ? "bg-gray-200/70" : "bg-white"
                    }`}
                  >
                    <td className="p-4">{u?.email || "—"}</td>
                    <td className="p-4">{u?.displayName || "—"}</td>
                    <td className="p-4">{u?.emailVerified ? "✅" : "❌"}</td>
                    <td className="p-4">{u?.providerIds || "—"}</td>
                    <td className="p-4">
                      {formatDate(u?.creationTime) || "—"}
                    </td>
                    <td className="p-4">
                      {formatDate(u?.lastSignInTime) || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-start">
            <button
              className="bg-white text-black border border-gray-400/80 px-3 py-2 cursor-pointer rounded-xl"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          </div>
        </>
      )}
    </section>
  );
}
