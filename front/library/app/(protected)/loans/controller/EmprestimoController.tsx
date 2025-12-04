"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/app/api"
import { useUserContext } from "@/app/context/UserContext"
import { Button } from "@/app/ui/global/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/ui/global/components/card"
import { CheckCircle2, XCircle, Plus } from "lucide-react"

interface Loan {
  id: string;
  dueDate: string;
  returnDate: string | null;
  isFinePaid: boolean;
  book: {
    id: string;
    title: string;
    author: string;
    isbn: string;
  };
}

export function EmprestimoController() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    setLoading(true)
    try {
      const response = await api.api.get("/loans")
      setLoans(response.data)
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReturn = async (loanId: string, event: React.MouseEvent) => {
    event.stopPropagation()

    if (!confirm("Confirmar devolução do livro?")) return

    try {
      await api.api.post(`/loans/${loanId}/return`)
      fetchLoans()
    } catch (error) {
      console.error("Erro ao finalizar empréstimo:", error)
    }
  }

  const handleLoanClick = (loanId: string) => {
    if (user?.role === "ADMIN" || user?.role === "BIBLIOTECARIO") {
      router.push(`/loans/form?id=${loanId}`)
    }
  }

  const isAdmin = user?.role === "ADMIN"
  const isBibliotecario = user?.role === "BIBLIOTECARIO"

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Carregando empréstimos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Empréstimos</h2>

        {(isAdmin || isBibliotecario) && (
          <Button onClick={() => router.push("/loans/form?mode=new")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Empréstimo
          </Button>
        )}
      </div>

      {loans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum empréstimo registrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <Card
              key={loan.id}
              className={`transition-all ${(isAdmin || isBibliotecario)
                  ? "cursor-pointer hover:shadow-lg hover:border-primary"
                  : ""
                }`}
              onClick={(isAdmin || isBibliotecario) ? () => handleLoanClick(loan.id) : undefined}
            >
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {loan.book?.title ?? "Livro não informado"}
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Autor: {loan.book?.author}
                </p>

                <p className="text-sm text-muted-foreground">
                  ISBN: {loan.book?.isbn}
                </p>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Data de Devolução:</span> {loan.dueDate}
                </div>

                {loan.returnDate && (
                  <div className="text-sm">
                    <span className="font-medium">Devolvido em:</span> {loan.returnDate}
                  </div>
                )}

                <div className="text-sm">
                  <span className="font-medium">Multa paga:</span>{" "}
                  {loan.isFinePaid ? "Sim" : "Não"}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                {!loan.returnDate && (isAdmin || isBibliotecario) && (
                  <Button onClick={(e) => handleReturn(loan.id, e)} className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Finalizar
                  </Button>
                )}

                {loan.returnDate && (
                  <div className="flex items-center text-blue-600 text-sm">
                    <XCircle className="h-4 w-4 mr-1" /> Finalizado
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
