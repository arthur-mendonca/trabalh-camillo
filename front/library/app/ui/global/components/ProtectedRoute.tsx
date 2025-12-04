"use client";

import { useUserContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

type AllowedRoles = ("ADMIN" | "BIBLIOTECARIO" | "ALUNO")[];

interface ProtectedRouteProps {
  allowedRoles: AllowedRoles;
  children: ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [user, router, allowedRoles]);

  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
