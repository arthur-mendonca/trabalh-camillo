"use client"
import Dashboard from "@/app/(protected)/dashboard/page";
import { useUserContext } from "@/app/context/UserContext";

export default function DashboardController() {
    const { user } = useUserContext()

    return <Dashboard user={user} />
}