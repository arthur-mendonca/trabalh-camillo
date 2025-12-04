"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PageBox from "@/app/ui/protected/PageBox"
import { EmprestimoController } from "./controller/EmprestimoController"
import LoanFormPage from "./form/page"

function LoansPageContent() {
  const params = useSearchParams()

  const isNew = params.get("mode") === "new"
  const isEditing = params.get("id") !== null

  if (isNew || isEditing) {
    return <PageBox>
      <LoanFormPage />
    </PageBox>
  }

  return <PageBox>
    <EmprestimoController />
  </PageBox>
}

export default function LoansPage() {
  return (
    <Suspense
      fallback={
        <PageBox>
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </PageBox>
      }
    >
      <LoansPageContent />
    </Suspense>
  )
}
