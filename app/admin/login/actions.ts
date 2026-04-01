"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;

  if (password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set("admin_auth", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7日間
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  (await cookies()).delete("admin_auth");
  redirect("/admin/login");
}
