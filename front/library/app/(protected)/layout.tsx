import DashboardController from "../controllers/dashboard/DashboardController"
import ProtectedLayout from "../ui/global/components/ProtectedLayout"


export default function ProtectedRoutes() {
    return (
        <ProtectedLayout>
            <DashboardController />
        </ProtectedLayout>
    )
}