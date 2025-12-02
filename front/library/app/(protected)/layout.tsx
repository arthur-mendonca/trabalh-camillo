import DashboardController from "../controllers/dashboard/DashboardController"
import ProtectedLayout from "../ui/global/components/ProtectedLayout"
import { Sidebar } from "../ui/protected/Sidebar"


export default function ProtectedRoutes() {
    return (
        <ProtectedLayout>
            <div className="min-h-screen min-w-screen grid grid-cols-2">
                <Sidebar />


                <div className="sm:pl-64">
                    <DashboardController />
                </div>
            </div>
        </ProtectedLayout>
    )
}