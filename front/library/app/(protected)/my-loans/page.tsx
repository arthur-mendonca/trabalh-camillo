"use client";

import { useEffect, useState } from "react";
import PageBox from "@/app/ui/protected/PageBox";
import ProtectedRoute from "@/app/ui/global/components/ProtectedRoute";
import { useUserContext } from "@/app/context/UserContext";
import apiInstance from "@/app/api";

type Loan = {
  id: string;
  bookTitle: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string | null;
  fineAmount: number;
  isFinePaid: boolean;
};

export default function MyLoansPage() {
  const { user } = useUserContext();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLoans = async () => {
      try {
        // apiInstance já cuida do auth_token no cookie
        const response = await apiInstance.get(
          `/loans/reports/by-student/${user.id}`
        );

        const data = response.data;

        const mapped: Loan[] = data.map((item: any) => ({
          id: item.id,
          bookTitle: item.book?.title ?? "Livro",
          loanDate: item.loanDate,
          dueDate: item.dueDate,
          returnDate: item.returnDate,
          fineAmount: item.fineAmount,
          isFinePaid: item.isFinePaid,
        }));

        setLoans(mapped);
      } catch (error) {
        console.error("Erro ao buscar empréstimos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  return (
    <ProtectedRoute allowedRoles={["ALUNO"]}>
      <PageBox>
        <h2 className="mb-4 text-2xl font-semibold">Meus empréstimos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : loans.length === 0 ? (
          <p>Você não possui empréstimos.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-700">
                <tr>
                  <th className="py-2 pr-4">Livro</th>
                  <th className="py-2 pr-4">Data empréstimo</th>
                  <th className="py-2 pr-4">Devolução prevista</th>
                  <th className="py-2 pr-4">Devolvido em</th>
                  <th className="py-2 pr-4">Multa</th>
                  <th className="py-2 pr-4">Situação</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className="border-b border-zinc-800">
                    <td className="py-2 pr-4">{loan.bookTitle}</td>
                    <td className="py-2 pr-4">
                      {new Date(loan.loanDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-2 pr-4">
                      {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-2 pr-4">
                      {loan.returnDate
                        ? new Date(loan.returnDate).toLocaleDateString("pt-BR")
                        : "-"}
                    </td>
                    <td className="py-2 pr-4">
                      {loan.fineAmount > 0
                        ? `R$ ${loan.fineAmount.toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="py-2 pr-4">
                      {loan.returnDate
                        ? loan.isFinePaid
                          ? "Finalizado"
                          : "Multa pendente"
                        : "Em aberto"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageBox>
    </ProtectedRoute>
  );
}
