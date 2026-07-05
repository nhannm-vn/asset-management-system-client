import { createCrudApi } from "./crudFactory";
import type {
  AssetCategoryResponse,
  ApprovalRoleResponse,
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

// AssetCategoriesController.cs -> api/asset-categories
export const categoriesApi = createCrudApi<AssetCategoryResponse, CreateAssetCategoryRequest>(
  "/api/asset-categories"
);

// LocationsController.cs -> api/locations
export const locationsApi = createCrudApi<LocationResponse, CreateLocationRequest>("/api/locations");

// SuppliersController.cs -> api/suppliers
export const suppliersApi = createCrudApi<SupplierResponse, CreateSupplierRequest>("/api/suppliers");

// DepartmentController.cs -> api/departments
export const departmentsApi = createCrudApi<DepartmentResponse, CreateDepartmentRequest>(
  "/api/departments"
);

// WorkflowsController.cs -> api/workflows
export const workflowsApi = createCrudApi<WorkflowResponse, CreateWorkflowRequest>("/api/workflows");

// ApprovalRolesController.cs -> api/approval-roles
export const approvalRolesApi = createCrudApi<ApprovalRoleResponse, CreateApprovalRoleRequest>(
  "/api/approval-roles"
);
