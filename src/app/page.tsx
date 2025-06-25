import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserForm from "@/components/forms/user-forms";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-12">
      <h1>Users</h1>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Add new user to the database.
              </DialogDescription>
            </DialogHeader>
            <UserForm />
          </DialogContent>
        </Dialog>
      </div>
      <UsersTable />
    </div>
  );
}
