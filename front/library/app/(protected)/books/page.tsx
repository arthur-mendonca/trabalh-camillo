"use client"

import PageBox from "@/app/ui/protected/PageBox"
import ProtectedRoute from "@/app/ui/global/components/ProtectedRoute";

export default function BooksPage() {
    return (
        <ProtectedRoute allowedRoles={["ADMIN", "BIBLIOTECARIO"]}>
            <PageBox>
                <h2 className="text-2xl font-semibold">Livros</h2>
            </PageBox>
        </ProtectedRoute>
    )
}
