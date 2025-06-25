"use server";

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    console.error(error);
    throw { error: "Failed to fetch users" };
  }
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  try {
    await db.insert(users).values(user);
    revalidatePath("/"); // Revalidate the users page to reflect the new user
  } catch (error) {
    console.error(error);
    throw { error: "Failed to create user" };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user;
  } catch (error) {
    console.error(error);
    throw { error: "Failed to fetch user by email" };
  }
}

export async function updateUser(
  // id: string,
  user: Omit<User, "createdAt" | "updatedAt">
) {
  try {
    await db.update(users).set(user).where(eq(users.id, user.id));
  } catch (error) {
    console.error(error);
    throw { error: "Failed to update user" };
  }
  revalidatePath("/"); // Revalidate the users page to reflect the updated user
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    console.error(error);
    throw { error: "Failed to delete user" };
  }
  revalidatePath("/"); // Revalidate the users page to reflect the deletion
}
