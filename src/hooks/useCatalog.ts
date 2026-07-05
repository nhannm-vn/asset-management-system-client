import { qk } from "@/lib/queryClient";
import {
  approvalRolesApi,
  categoriesApi,
  departmentsApi,
  locationsApi,
  suppliersApi,
  workflowsApi,
} from "@/api/catalog.api";
import { createCrudHooks } from "./useCrudQuery";
import type {
  ApprovalRoleResponse,
  AssetCategoryResponse,
  CreateApprovalRoleRequest,
  CreateAssetCategoryRequest,
  CreateDepartmentRequest,
  CreateLocationRequest,
  CreateSupplierRequest,
  CreateWorkflowRequest,
  DepartmentResponse,
  LocationResponse,
  SupplierResponse,
  WorkflowResponse,
} from "@/types/dto";

export const categoryHooks = createCrudHooks<AssetCategoryResponse, CreateAssetCategoryRequest>(
  qk.categories,
  categoriesApi,
  "loại tài sản"
);

export const locationHooks = createCrudHooks<LocationResponse, CreateLocationRequest>(
  qk.locations,
  locationsApi,
  "vị trí"
);

export const supplierHooks = createCrudHooks<SupplierResponse, CreateSupplierRequest>(
  qk.suppliers,
  suppliersApi,
  "nhà cung cấp"
);

export const departmentHooks = createCrudHooks<DepartmentResponse, CreateDepartmentRequest>(
  qk.departments,
  departmentsApi,
  "phòng ban"
);

export const workflowHooks = createCrudHooks<WorkflowResponse, CreateWorkflowRequest>(
  qk.workflows,
  workflowsApi,
  "quy trình"
);

export const approvalRoleHooks = createCrudHooks<ApprovalRoleResponse, CreateApprovalRoleRequest>(
  qk.approvalRoles,
  approvalRolesApi,
  "vai trò duyệt"
);
