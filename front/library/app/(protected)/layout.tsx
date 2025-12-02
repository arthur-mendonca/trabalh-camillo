import ProtectedLayout from "../ui/global/components/ProtectedLayout"
import Dashboard from "./dashboard/page"

export default function ProtectedRoutes() {
    return (
        <ProtectedLayout>
            <Dashboard />
        </ProtectedLayout>
    )
}