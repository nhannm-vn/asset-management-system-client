import type { AssetRequestStatus, AssetStatus } from "./enums";

// ============================================================================
// Envelope chung — khớp ApiResponse<T>.cs
// ============================================================================
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

export interface PagedResult<T> {
  total: number;
  data: T[];
}

export interface ApiError {
  status?: number;
  message: string;
}

// ============================================================================
// Auth — AuthController.cs
// ============================================================================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
}

// ============================================================================
// Users — UserController.cs
// ============================================================================
export interface UserResponse {
  id: number;
  username: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  roleId: number;
  departmentId: number | null;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roleId: number;
  departmentId?: number | null;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  departmentId?: number | null;
}

// ============================================================================
// Assets — AssetsController.cs
// ============================================================================
export interface AssetResponse {
  id: number;
  assetCode: string;
  name: string;
  status: AssetStatus;
  categoryId: number;
  locationId: number;
  supplierId: number | null;
  value: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAssetRequestDto {
  assetCode: string;
  name: string;
  categoryId: number;
  locationId: number;
  supplierId?: number | null;
  value?: number | null;
}

export interface UpdateAssetRequestDto {
  name: string;
  categoryId: number;
  locationId: number;
  supplierId?: number | null;
  value?: number | null;
}

export interface AssetFilter {
  keyword?: string;
  status?: AssetStatus | "";
  categoryId?: number | "";
  locationId?: number | "";
  page: number;
  pageSize: number;
}

// ============================================================================
// Danh mục đơn giản — AssetCategories / Locations / Suppliers / Departments
// ============================================================================
export interface AssetCategoryResponse {
  id: number;
  name: string;
}
export interface CreateAssetCategoryRequest {
  name: string;
}

export interface LocationResponse {
  id: number;
  name: string;
  address: string | null;
}
export interface CreateLocationRequest {
  name: string;
  address?: string;
}

export interface SupplierResponse {
  id: number;
  name: string;
  contactPerson: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}
export interface CreateSupplierRequest {
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  description: string | null;
}
export interface CreateDepartmentRequest {
  name: string;
  description?: string;
}

// ============================================================================
// Workflow / Approval Role / Approval Step
// ============================================================================
export interface WorkflowResponse {
  id: number;
  name: string;
  description: string | null;
}
export interface CreateWorkflowRequest {
  name: string;
  description?: string;
}

export interface ApprovalRoleResponse {
  id: number;
  name: string;
  level: number;
}
export interface CreateApprovalRoleRequest {
  name: string;
  level: number;
}

export interface ApprovalStepResponse {
  id: number;
  workflowId: number;
  stepOrder: number;
  approvalRoleId: number;
}
export interface CreateApprovalStepRequest {
  workflowId: number;
  stepOrder: number;
  approvalRoleId: number;
}

export interface DepartmentWorkflowResponse {
  id: number;
  departmentId: number;
  workflowId: number;
}
export interface CreateDepartmentWorkflowRequest {
  departmentId: number;
  workflowId: number;
}

export interface UserApprovalRoleResponse {
  id: number;
  userId: number;
  userName: string;
  approvalRoleId: number;
  approvalRoleName: string;
  departmentId: number | null;
  departmentName: string | null;
}
export interface CreateUserApprovalRoleRequest {
  userId: number;
  approvalRoleId: number;
  departmentId?: number | null;
}
export interface UpdateUserApprovalRoleRequest {
  approvalRoleId: number;
  departmentId?: number | null;
}

// ============================================================================
// Asset Requests — AssetRequestController.cs
// ============================================================================
export interface AssetRequestResponse {
  id: number;
  userId: number;
  assetId: number;
  workflowId: number;
  currentStep: number;
  status: AssetRequestStatus;
  createdAt: string;
}
export interface CreateAssetRequestDtoBody {
  assetId: number;
  workflowId: number;
}

// ============================================================================
// Approvals — ApprovalController.cs (nhiều response là anonymous object ở BE)
// ============================================================================
export interface PendingApprovalResponse {
  requestId: number;
  assetId: number;
  assetName: string;
  requesterId: number;
  requesterName: string;
  currentStep: number;
  status: AssetRequestStatus;
  createdAt: string;
}

export interface ApprovalHistoryEntry {
  stepOrder: number;
  approvalRoleId: number;
  approvedBy: number;
  status: string;
  comment: string | null;
  createdAt: string;
}

export interface AdminRequestSummary {
  id: number;
  assetId: number;
  assetName: string;
  userId: number;
  requesterName: string;
  currentStep: number;
  status: AssetRequestStatus;
  createdAt: string;
}

// ============================================================================
// Assignments — AssignmentController.cs
// ============================================================================
export interface AssignmentResponse {
  id: number;
  assetId: number;
  assetName: string;
  userId: number;
  userName: string;
  assignedDate: string | null;
  returnedDate: string | null;
  status: string;
}

// ============================================================================
// Admin — AdminController.cs
// ============================================================================
export interface DashboardSummaryResponse {
  totalAssets: number;
  availableAssets: number;
  inUseAssets: number;
  maintenanceAssets: number;
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  cancelledRequests: number;
  activeAssignments: number;
  returnedAssignments: number;
}

// ============================================================================
// Notifications — NotificationController.cs
// ============================================================================
export interface NotificationResponse {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}
