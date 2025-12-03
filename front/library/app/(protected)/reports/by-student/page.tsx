import PageBox from "@/app/ui/protected/PageBox";
import { ReportsByStudentController } from "./controller/ReportsByStudentController";

export default function ReportsByStudentPage() {
    return (
        <PageBox>
            <h2 className="text-2xl font-semibold mb-6">Relatório: Livros Emprestados por Aluno</h2>
            <ReportsByStudentController />
        </PageBox>
    );
}
