"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "@/app/api"
import { useUserContext } from "@/app/context/UserContext"
import PageBox from "@/app/ui/protected/PageBox"
import { Button } from "@/app/ui/global/components/button"
import Input from "@/app/ui/global/components/Input"
import { Label } from "@/app/ui/global/components/label"
import { ArrowLeft, XCircle } from "lucide-react" 
import axios from "axios" 

interface LoanFormData {
  userId: string
  bookId: string
  dueDate: string
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Book {
  id: string
  title: string
}

function LoanFormContent() {
  const searchParams = useSearchParams()
  const loanId = searchParams.get("id")
  const isEditing = !!loanId

  const [formData, setFormData] = useState<LoanFormData>({
    userId: "",
    bookId: "",
    dueDate: new Date().toISOString().split("T")[0],
  })

  const [users, setUsers] = useState<User[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingLoan, setLoadingLoan] = useState(isEditing)
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // Novo estado para erro

  const router = useRouter()

  useEffect(() => {
    fetchUsers()
    fetchBooks()
    if (isEditing) fetchLoan()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.api.get("/users")
      const students = response.data.filter((user: User) => user.role === "ALUNO")
      setUsers(students)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await api.api.get("/books")
      setBooks(response.data)
    } catch (error) {
      console.error("Erro ao carregar livros:", error)
    }
  }

  const fetchLoan = async () => {
    try {
      const response = await api.api.get(`/loans/${loanId}`)
      const loan = response.data

      setFormData({
        userId: loan.userId,
        bookId: loan.bookId,
        dueDate: loan.dueDate.split("T")[0],
      })
    } catch (error) {
      console.error("Erro ao buscar empréstimo:", error)
    } finally {
      setLoadingLoan(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null) 
  
    try {
      let payload;
      
      if (isEditing) {
        payload = {
          userId: formData.userId,
          bookId: formData.bookId,
          dueDate: formData.dueDate, 
          isFinePaid: false, 
        }
        await api.api.patch(`/loans/${loanId}`, payload)
      } else {
       payload = {
          userId: formData.userId,
          bookId: formData.bookId,
          dueDate: formData.dueDate, 
        }
        await api.api.post("/loans", payload) 
      }
  
      router.push("/loans")
    } catch (error) {
      let message = "Ocorreu um erro desconhecido ao salvar o empréstimo.";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data?.message || `Erro do servidor: Status ${error.response.status}. Por favor, verifique os dados.`;
        if (error.response.status === 400) {
            message += " (Verifique se o livro está disponível ou se o usuário pode pegar um novo empréstimo.)";
        }
      }
      setErrorMessage(message)
      console.error("Erro ao salvar empréstimo:", error)
    } finally {
      setLoading(false)
    }
  }
  
  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (loadingLoan) {
    return (
      <PageBox>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </PageBox>
    )
  }

  return (
    <PageBox>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/loans")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold">
            {isEditing ? "Editar Empréstimo" : "Novo Empréstimo"}
          </h2>
        </div>
        
        {errorMessage && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start dark:bg-red-900/30 dark:border-red-600 dark:text-red-300">
                <XCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{errorMessage}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="userId">Usuário *</Label>
            <select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-background dark:bg-zinc-800 dark:border-zinc-700 focus:ring-sky-500 focus:border-sky-500 transition"
            >
              <option value="">Selecione o usuário</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookId">Livro *</Label>
            <select
              id="bookId"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-background dark:bg-zinc-800 dark:border-zinc-700 focus:ring-sky-500 focus:border-sky-500 transition"
            >
              <option value="">Selecione o livro</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Devolução *</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" onClick={() => router.push("/loans")} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600">
              {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
          </div>

        </form>
      </div>
    </PageBox>
  )
}

export default function LoanFormPage() {
  return (
    <Suspense fallback={
      <PageBox>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </PageBox>
    }>
      <LoanFormContent />
    </Suspense>
  )
}