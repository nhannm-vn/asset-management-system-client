import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/axios";
import type {
  ApprovalStepResponse,
  CreateApprovalStepRequest,
  CreateDepartmentWorkflowRequest,
  CreateUserApprovalRoleRequest,
  DepartmentWorkflowResponse,
  UpdateUserApprovalRoleRequest,
  UserApprovalRoleResponse,
} from "@/types/dto";

// ApprovalStepController.cs -> api/approval-steps
export const approvalStepsApi = {
  getByWorkflowId: (workflowId: number) =>
    apiGet<ApprovalStepResponse[]>(`/api/approval-steps/workflow/${workflowId}`),
  create: (payload: CreateApprovalStepRequest) =>
    apiPost<ApprovalStepResponse>("/api/approval-steps", payload),
  remove: (id: number) => apiDelete<boolean>(`/api/approval-steps/${id}`),
};

// DepartmentWorkflowController.cs -> api/department-workflows
export const departmentWorkflowsApi = {
  getAll: () => apiGet<DepartmentWorkflowResponse[]>("/api/department-workflows"),
  getByDepartmentId: (departmentId: number) =>
    apiGet<DepartmentWorkflowResponse[]>(`/api/department-workflows/department/${departmentId}`),
  getByWorkflowId: (workflowId: number) =>
    apiGet<DepartmentWorkflowResponse[]>(`/api/department-workflows/workflow/${workflowId}`),
  create: (payload: CreateDepartmentWorkflowRequest) =>
    apiPost<DepartmentWorkflowResponse>("/api/department-workflows", payload),
  remove: (id: number) => apiDelete<boolean>(`/api/department-workflows/${id}`),
};

// UserApprovalRoleController.cs -> api/user-approval-roles
export const userApprovalRolesApi = {
  getAll: () => apiGet<UserApprovalRoleResponse[]>("/api/user-approval-roles"),
  getByUserId: (userId: number) =>
    apiGet<UserApprovalRoleResponse[]>(`/api/user-approval-roles/user/${userId}`),
  create: (payload: CreateUserApprovalRoleRequest) =>
    apiPost<UserApprovalRoleResponse>("/api/user-approval-roles", payload),
  update: (id: number, payload: UpdateUserApprovalRoleRequest) =>
    apiPut<UserApprovalRoleResponse>(`/api/user-approval-roles/${id}`, payload),
  remove: (id: number) => apiDelete<boolean>(`/api/user-approval-roles/${id}`),
};
