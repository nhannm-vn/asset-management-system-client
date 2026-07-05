import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useSessionBootstrap } from "@/hooks/useSessionBootstrap";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import AssetsPage from "@/pages/AssetsPage";
import CategoriesPage from "@/pages/CategoriesPage";
import LocationsPage from "@/pages/LocationsPage";
import SuppliersPage from "@/pages/SuppliersPage";
import DepartmentsPage from "@/pages/DepartmentsPage";
import UsersPage from "@/pages/UsersPage";
import WorkflowsPage from "@/pages/WorkflowsPage";
import ApprovalRolesPage from "@/pages/ApprovalRolesPage";
import DepartmentWorkflowsPage from "@/pages/DepartmentWorkflowsPage";
import UserApprovalRolesPage from "@/pages/UserApprovalRolesPage";
import MyRequestsPage from "@/pages/MyRequestsPage";
import AdminRequestsPage from "@/pages/AdminRequestsPage";
import ApprovalsPage from "@/pages/ApprovalsPage";
import MyAssignmentsPage from "@/pages/MyAssignmentsPage";
import AdminAssignmentsPage from "@/pages/AdminAssignmentsPage";
import ReportsPage from "@/pages/ReportsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  useSessionBootstrap();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/assets" replace />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/requests" element={<MyRequestsPage />} />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route path="/my-assignments" element={<MyAssignmentsPage />} />

        <Route path="/admin/requests" element={<ProtectedRoute adminOnly><AdminRequestsPage /></ProtectedRoute>} />
        <Route path="/admin/assignments" element={<ProtectedRoute adminOnly><AdminAssignmentsPage /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute adminOnly><ReportsPage /></ProtectedRoute>} />

        <Route path="/categories" element={<ProtectedRoute adminOnly><CategoriesPage /></ProtectedRoute>} />
        <Route path="/locations" element={<ProtectedRoute adminOnly><LocationsPage /></ProtectedRoute>} />
        <Route path="/suppliers" element={<ProtectedRoute adminOnly><SuppliersPage /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute adminOnly><DepartmentsPage /></ProtectedRoute>} />

        <Route path="/workflows" element={<ProtectedRoute adminOnly><WorkflowsPage /></ProtectedRoute>} />
        <Route path="/approval-roles" element={<ProtectedRoute adminOnly><ApprovalRolesPage /></ProtectedRoute>} />
        <Route path="/department-workflows" element={<ProtectedRoute adminOnly><DepartmentWorkflowsPage /></ProtectedRoute>} />
        <Route path="/user-approval-roles" element={<ProtectedRoute adminOnly><UserApprovalRolesPage /></ProtectedRoute>} />

        <Route path="/users" element={<ProtectedRoute adminOnly><UsersPage /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
