"use client";

import { useState, useEffect } from "react";
import api from "@/app/api";

interface OverdueLoan {
    id: string;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
    fineAmount: number;
    isFinePaid: boolean;
    user: {
        id: string;
        name: string;
        email: string;
    };
    book: {
        id: string;
        title: string;
        author: string;
        isbn: string;
    };
}

export function ReportsOverdueController() {
    const [overdueLoans, setOverdueLoans] = useState<OverdueLoan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOverdueLoans();
    }, []);

    const fetchOverdueLoans = async () => {
        setLoading(true);
        try {
            const response = await api.api.get("/loans/reports/overdue");
            setOverdueLoans(response.data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos em atraso:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("pt-BR");
    };

    const calculateDaysOverdue = (dueDate: string) => {
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = today.getTime() - due.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    return (
        <div className="space-y-6">
            {loading ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
                </div>
            ) : overdueLoans.length > 0 ? (
                <>
                    <div className="mb-4">
                        <p className="text-gray-600 dark:text-gray-400">
                            Total de empréstimos em atraso: <strong>{overdueLoans.length}</strong>
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Aluno</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Livro</th>
                                    <th scope="col" className="px-6 py-3">Autor</th>
                                    <th scope="col" className="px-6 py-3">Data Empréstimo</th>
                                    <th scope="col" className="px-6 py-3">Prazo Devolução</th>
                                    <th scope="col" className="px-6 py-3">Dias em Atraso</th>
                                    <th scope="col" className="px-6 py-3">Multa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overdueLoans.map((loan) => {
                                    const daysOverdue = calculateDaysOverdue(loan.dueDate);
                                    return (
                                        <tr key={loan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                {loan.user.name}
                                            </td>
                                            <td className="px-6 py-4">{loan.user.email}</td>
                                            <td className="px-6 py-4">{loan.book.title}</td>
                                            <td className="px-6 py-4">{loan.book.author}</td>
                                            <td className="px-6 py-4">{formatDate(loan.loanDate)}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-red-600 dark:text-red-400 font-semibold">
                                                    {formatDate(loan.dueDate)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                                    {daysOverdue} {daysOverdue === 1 ? "dia" : "dias"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {loan.fineAmount > 0 ? (
                                                    <span className={loan.isFinePaid ? "text-green-600" : "text-red-600 font-semibold"}>
                                                        R$ {loan.fineAmount.toFixed(2)}
                                                        {loan.isFinePaid ? " ✓" : ""}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        ✓ Nenhum empréstimo em atraso no momento.
                    </p>
                </div>
            )}
        </div>
    );
}
