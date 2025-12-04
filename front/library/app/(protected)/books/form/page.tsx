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
// import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

interface BookFormData {
  title: string
  author: string
  isbn: string
  totalCopies: string
}

function BookFormContent() {
  const searchParams = useSearchParams()
  const bookId = searchParams.get("id")
  const isEditing = !!bookId

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    totalCopies: "1",
  })
  const [loading, setLoading] = useState(false)
  const [loadingBook, setLoadingBook] = useState(isEditing)
  const { user } = useUserContext()
  const router = useRouter()
//   const { toast } = useToast()

  useEffect(() => {
    // Apenas ADMIN pode acessar esta página
    if (user && user.role !== "ADMIN") {
      console.warn("Acesso negado: Apenas administradores podem acessar esta página.")
      router.push("/books")
      return
    }

    if (isEditing) {
      fetchBook()
    }
  }, [bookId, user])

  const fetchBook = async () => {
    try {
      const response = await api.api.get(`/books/${bookId}`)
      const book = response.data
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        totalCopies: book.totalCopies.toString(),
      })
    } catch (error) {
      console.error("Erro ao buscar livro:", error)
    } finally {
      setLoadingBook(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        totalCopies: Number.parseInt(formData.totalCopies),
      }

      if (isEditing) {
        await api.api.patch(`/books/${bookId}`, payload)
        console.log("Sucesso: Livro atualizado com sucesso.")
      } else {
        await api.api.post("/books", payload)
        console.log("Sucesso: Livro criado com sucesso.")
      }

      router.push("/books")
    } catch (error) {
      console.error("Erro ao salvar livro:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loadingBook) {
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
          <Button onClick={() => router.push("/books")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold">{isEditing ? "Editar Livro" : "Novo Livro"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Digite o título do livro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Autor *</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Digite o nome do autor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN *</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              placeholder="Digite o ISBN"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalCopies">Total de Cópias *</Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min="1"
              value={formData.totalCopies}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" onClick={() => router.push("/books")} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </PageBox>
  )
}

export default function BookFormPage() {
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
      <BookFormContent />
    </Suspense>
  )
}
