import { getUsers } from "@/actions/users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import DeleteUserBtn from "./delete-user-btn";
import UserForm from "./forms/user-forms";

export default async function UsersTable() {
  const users = await getUsers(); // Assuming getUsers is defined to fetch users
  return (
    <Table className="border-stone-600 rounded shadow-md">
      <TableCaption>A list of all users on database.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="w-[100px]">{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.createdAt?.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"icon"} variant="ghost">
                    <Pencil className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit user</DialogTitle>
                    <UserForm user={user} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <DeleteUserBtn userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
