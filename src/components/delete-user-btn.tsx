"use client";

import { deleteUser } from "@/actions/users";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteUserBtnProps {
  userId: string;
}

export default function DeleteUserBtn({ userId }: DeleteUserBtnProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      setIsOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
      toast.success("User has been deleted!");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="ghost" className="ml-2">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <Button
            disabled={isLoading}
            variant="destructive"
            className="mt-4"
            onClick={() => handleDelete()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">
                  <Loader className="size-4" />
                </span>
                Deleting...
              </span>
            ) : (
              "Delete User"
            )}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
