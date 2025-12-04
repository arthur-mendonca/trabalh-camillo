"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/app/api"
import { useUserContext } from "@/app/context/UserContext"
import { Button } from "@/app/ui/global/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/ui/global/components/card"
import { Trash2, BookOpen, Plus } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publisher?: string
  publishYear?: number
  availableCopies: number
  totalCopies: number
}

export function BooksController() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await api.api.get("/books")
      setBooks(response.data)
    } catch (error) {
      console.error("Erro ao buscar livros:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bookId: string, event: React.MouseEvent) => {
    event.stopPropagation()

    if (!confirm("Tem certeza que deseja excluir este livro?")) {
      return
    }

    try {
      await api.api.delete(`/books/${bookId}`)
        console.log("Sucesso: Livro excluído com sucesso.")
      fetchBooks()
    } catch (error) {
      console.error("Erro ao excluir livro:", error)
      
    }
  }

  const handleLoan = async (bookId: string, event: React.MouseEvent) => {
    event.stopPropagation()

    router.push(`/loans/new?bookId=${bookId}`)
  }

  const handleBookClick = (bookId: string) => {
    if (user?.role === "ADMIN") {
      router.push(`/books/form?id=${bookId}`)
    }
  }

  const isAdmin = user?.role === "ADMIN"
  const isBibliotecario = user?.role === "BIBLIOTECARIO"

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Carregando livros...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Livros</h2>
        {isAdmin && (
          <Button onClick={() => router.push("/books/form")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Livro
          </Button>
        )}
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum livro cadastrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card
              key={book.id}
              className={`transition-all ${isAdmin ? "cursor-pointer hover:shadow-lg hover:border-primary" : ""}`}
              onClick={() => handleBookClick(book.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </div>
                {book.publisher && (
                  <div className="text-sm">
                    <span className="font-medium">Editora:</span> {book.publisher}
                  </div>
                )}
                {book.publishYear && (
                  <div className="text-sm">
                    <span className="font-medium">Ano:</span> {book.publishYear}
                  </div>
                )}
                <div className="text-sm">
                  <span className="font-medium">Disponíveis:</span>{" "}
                  <span
                    className={
                      book.availableCopies > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }
                  >
                    {book.availableCopies} / {book.totalCopies}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {isBibliotecario && (
                  <Button
                    //size="sm"
                    onClick={(e) => handleLoan(book.id, e)}
                    disabled={book.availableCopies === 0}
                    className="flex-1"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Emprestar
                  </Button>
                )}

                {isAdmin && (
                  <Button
                    onClick={(e) => handleDelete(book.id, e)}
                    className={isBibliotecario ? "" : "flex-1"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
