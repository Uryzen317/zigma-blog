"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { User } from "@/lib/types/user.type";
import { uDel, uGet, uPatch, uPost } from "@/lib/uFetch";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Role } from "@/lib/types/role.type";
import * as moment from "jalali-moment";
import {
  ArrowDownFromLine,
  ArrowDownToDot,
  ArrowUpFromDot,
  Delete,
  DeleteIcon,
  Trash,
  Trash2,
} from "lucide-react";

const useManageUsers = create<UseManageUsers>((set) => ({
  isLoading: false,
  users: [],
  setIsLoading: (mode) => set((_s) => ({ isLoading: mode })),
  setUsers: (users) => set((_s) => ({ users })),
}));

type UseManageUsers = {
  isLoading: boolean;
  users: User[];
  setIsLoading: (mode: boolean) => void;
  setUsers: (users: User[]) => void;
};

export default function ManageUsers() {
  const { isLoading, users, setIsLoading, setUsers } = useManageUsers();

  useEffect(() => {
    uGet<User[]>("get-users", {
      setIsLoading,
      withCredentials: true,
    }).then((resUsers) => {
      setUsers(resUsers);
    });
  }, []);

  async function deleteUser(userID: string) {
    await uDel(`delete-user/${userID}`, {
      setIsLoading,
      withCredentials: true,
    });

    setUsers(users.filter((user) => user._id !== userID));
  }

  async function promoteUser(userID: string) {
    await uPatch(
      `promote-user`,
      {
        userID,
      },
      {
        setIsLoading,
        withCredentials: true,
      }
    );

    setUsers(
      users.map((user) => {
        if (user._id === userID) user.roles.push(Role.writer);
        return user;
      })
    );
  }

  async function demoteUser(userID: string) {
    await uPatch(
      `demote-user`,
      {
        userID,
      },
      {
        setIsLoading,
        withCredentials: true,
      }
    );

    setUsers(
      users.map((user) => {
        if (user._id === userID)
          user.roles = user.roles.filter((role) => role !== Role.writer);
        return user;
      })
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            className="animate-spin fill-primary"
          >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
          </svg>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="h-12 items-center">
              <TableHead className="text-right">عملیات</TableHead>
              <TableHead className="text-right">تاریخ ثبت نام</TableHead>
              <TableHead className="text-right">دسترسی ها</TableHead>
              <TableHead className="text-right">نام کاربری</TableHead>
              <TableHead className="text-right">شماره</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} className="h-12 items-center">
                <TableCell className="mt-1.5 flex gap-4 items-center justify-end">
                  {user.roles.includes(Role.writer) ? (
                    <ArrowDownToDot
                      width={18}
                      height={18}
                      className="cursor-pointer"
                      onClick={() => demoteUser(user._id)}
                    />
                  ) : (
                    <ArrowUpFromDot
                      width={18}
                      height={18}
                      className="cursor-pointer"
                      onClick={() => promoteUser(user._id)}
                    />
                  )}

                  <Trash2
                    width={18}
                    height={18}
                    className="cursor-pointer"
                    onClick={() => deleteUser(user._id)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  {moment
                    .from(user.createdAt, "en")
                    .locale("fa")
                    .format("YYYY/MM/DD HH:mm")}
                </TableCell>
                <TableCell className="text-right">
                  {user.roles.map((role) => Role[role]).join(" - ")}
                </TableCell>
                <TableCell className="text-right">{user.username}</TableCell>
                <TableCell className="text-right">{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
