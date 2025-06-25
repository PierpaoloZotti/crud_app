"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/actions/users";
import { useState } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { User } from "@/db/schema";
import { DialogClose } from "../ui/dialog";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

interface UserFormProps {
  user?: User;
}

export default function UserForm({ user }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const userData = {
        ...values,
        password: "password123",
      };
      if (user) {
        await updateUser({
          ...userData,
          id: user.id,
        });
        toast.success("User has been updated!");
      } else {
        await createUser(userData);
        form.reset();
        toast.success(`User has been ${user ? "updated" : "added"}!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Bruce Wayne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="bruce@wayne.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit" disabled={isLoading}>
            <Loader
              className={cn(
                "hidden",
                isLoading ? "flex mr-2 animate-spin" : ""
              )}
            />
            {user ? "Update User" : "Add User"}
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}
