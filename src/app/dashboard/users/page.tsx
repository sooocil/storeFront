"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface User {
  id: number;
  name: string;
  email: string;
}

const dummyUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        // Combine stored and dummy users, filter duplicates by id
        const combinedUsers = [
          ...storedUsers.filter((user: User) => user.id != null),
          ...dummyUsers.filter(
            (dummy) => !storedUsers.some((user: User) => user.id === dummy.id)
          ),
        ];
        // Ensure unique IDs
        const validUsers = combinedUsers.filter(
          (user, index, self) => self.findIndex((u) => u.id === user.id) === index
        );
        setUsers(validUsers);
      } catch (error) {
        console.error("Failed to parse users:", error);
        setUsers([...dummyUsers]); // Fallback to dummy users
      }
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Users ({filteredUsers.length}) {users.length === dummyUsers.length ? "These are dummy users as no users are in local storage." : ""}
      </h1>
      <Input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full max-w-md"
      />
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wide">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mounted ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <TableRow
                    key={user.id}
                    className={`transition-colors hover:bg-muted/50 cursor-pointer ${
                      idx % 2 === 0 ? "bg-muted/10" : "bg-white"
                    }`}
                  >
                    <TableCell className="px-6 py-3 font-medium text-gray-900">{user.name}</TableCell>
                    <TableCell className="px-6 py-3 text-gray-700">{user.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no-users">
                  <TableCell colSpan={2} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow key="loading">
                <TableCell colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  Loading users...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
