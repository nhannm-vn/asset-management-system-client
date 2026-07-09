import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useSessionBootstrap } from "@/hooks/useSessionBootstrap";
import { useIsAdmin } from "@/store/authStore";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import DepartmentsPage from "@/pages/DepartmentsPage";
import CategoriesPage from "@/pages/CategoriesPage";
import LocationsPage from "@/pages/LocationsPage";
import SuppliersPage from "@/pages/SuppliersPage";
import UsersPage from "@/pages/UsersPage";
import ApprovalRolesPage from "@/pages/ApprovalRolesPage";
import WorkflowsPage from "@/pages/WorkflowsPage";
import DepartmentWorkflowsPage from "@/pages/DepartmentWorkflowsPage";
import UserApprovalRolesPage from "@/pages/UserApprovalRolesPage";
import AssetsPage from "@/pages/AssetsPage";
import AdminRequestsPage from "@/pages/AdminRequestsPage";
import ApprovalsPage from "@/pages/ApprovalsPage";
import AdminAssignmentsPage from "@/pages/AdminAssignmentsPage";
import ReportsPage from "@/pages/ReportsPage";
import MyRequestsPage from "@/pages/MyRequestsPage";
import MyAssignmentsPage from "@/pages/MyAssignmentsPage";
import NotFoundPage from "@/pages/NotFoundPage";

/** ADMIN mở "/" -> về Tổng quan (điểm bắt đầu của luồng thiết lập).
 * USER mở "/" -> về Tài sản (việc họ thực sự cần làm). */
function RootRedirect() {
  const isAdmin = useIsAdmin();
  return <Navigate to={isAdmin ? "/dashboard" : "/assets"} replace />;
}

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
        <Route path="/" element={<RootRedirect />} />

        {/* Tổng quan — điểm khởi đầu */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Bước 1 — Danh mục nền tảng */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute adminOnly>
              <DepartmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute adminOnly>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locations"
          element={
            <ProtectedRoute adminOnly>
              <LocationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute adminOnly>
              <SuppliersPage />
            </ProtectedRoute>
          }
        />

        {/* Bước 2 — Người dùng */}
        <Route
          path="/users"
          element={
            <ProtectedRoute adminOnly>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        {/* Bước 3 — Quy trình duyệt (đúng thứ tự: vai trò -> quy trình -> gán) */}
        <Route
          path="/approval-roles"
          element={
            <ProtectedRoute adminOnly>
              <ApprovalRolesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows"
          element={
            <ProtectedRoute adminOnly>
              <WorkflowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-workflows"
          element={
            <ProtectedRoute adminOnly>
              <DepartmentWorkflowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-approval-roles"
          element={
            <ProtectedRoute adminOnly>
              <UserApprovalRolesPage />
            </ProtectedRoute>
          }
        />

        {/* Bước 4 — Tài sản (dùng chung ADMIN + USER, mỗi role thấy 1 chế độ khác nhau) */}
        <Route path="/assets" element={<AssetsPage />} />

        {/* Vận hành hằng ngày — chỉ dùng được sau khi 4 bước trên đã xong */}
        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute adminOnly>
              <AdminRequestsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/approvals" element={<ApprovalsPage />} />
        <Route
          path="/admin/assignments"
          element={
            <ProtectedRoute adminOnly>
              <AdminAssignmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute adminOnly>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        {/* Màn hình riêng của nhân viên (USER) */}
        <Route path="/requests" element={<MyRequestsPage />} />
        <Route path="/my-assignments" element={<MyAssignmentsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
