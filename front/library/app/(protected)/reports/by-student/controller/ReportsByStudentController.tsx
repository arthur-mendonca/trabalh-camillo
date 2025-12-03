"use client";

import { useState, useEffect } from "react";
import api from "@/app/api";

interface Loan {
    id: string;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
    fineAmount: number;
    isFinePaid: boolean;
    book: {
        id: string;
        title: string;
        author: string;
        isbn: string;
    };
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export function ReportsByStudentController() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.api.get("/users");
            // Filtrar apenas alunos
            const students = response.data.filter((user: User) => user.role === "ALUNO");
            setUsers(students);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const fetchLoansByStudent = async (userId: string) => {
        if (!userId) return;
        
        setLoading(true);
        try {
            const response = await api.api.get(`/loans/reports/by-student/${userId}`);
            setLoans(response.data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserChange = (userId: string) => {
        setSelectedUserId(userId);
        if (userId) {
            fetchLoansByStudent(userId);
        } else {
            setLoans([]);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR");
    };

    return (
        <div className="space-y-6">
            <div className="max-w-md">
                <label htmlFor="student" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selecione um aluno
                </label>
                <select
                    id="student"
                    value={selectedUserId}
                    onChange={(e) => handleUserChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">-- Escolha um aluno --</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
                </div>
            ) : loans.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Livro</th>
                                <th scope="col" className="px-6 py-3">Autor</th>
                                <th scope="col" className="px-6 py-3">ISBN</th>
                                <th scope="col" className="px-6 py-3">Data Empréstimo</th>
                                <th scope="col" className="px-6 py-3">Data Devolução</th>
                                <th scope="col" className="px-6 py-3">Devolvido</th>
                                <th scope="col" className="px-6 py-3">Multa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {loan.book.title}
                                    </td>
                                    <td className="px-6 py-4">{loan.book.author}</td>
                                    <td className="px-6 py-4">{loan.book.isbn}</td>
                                    <td className="px-6 py-4">{formatDate(loan.loanDate)}</td>
                                    <td className="px-6 py-4">{formatDate(loan.dueDate)}</td>
                                    <td className="px-6 py-4">
                                        {loan.returnDate ? (
                                            <span className="text-green-600 dark:text-green-400">
                                                {formatDate(loan.returnDate)}
                                            </span>
                                        ) : (
                                            <span className="text-yellow-600 dark:text-yellow-400">
                                                Pendente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {loan.fineAmount > 0 ? (
                                            <span className={loan.isFinePaid ? "text-green-600" : "text-red-600"}>
                                                R$ {loan.fineAmount.toFixed(2)}
                                                {loan.isFinePaid ? " (Pago)" : " (Pendente)"}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : selectedUserId ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Nenhum empréstimo encontrado para este aluno.
                    </p>
                </div>
            ) : null}
        </div>
    );
}
