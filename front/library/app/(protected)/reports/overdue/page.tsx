import PageBox from "@/app/ui/protected/PageBox";
import { ReportsOverdueController } from "./controller/ReportsOverdueController";

export default function ReportsOverduePage() {
    return (
        <PageBox>
            <h2 className="text-2xl font-semibold mb-6">Relatório: Livros em Atraso</h2>
            <ReportsOverdueController />
        </PageBox>
    );
}
