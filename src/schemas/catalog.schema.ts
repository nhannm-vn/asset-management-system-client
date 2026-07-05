import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên loại"),
});
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const locationFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên vị trí"),
  address: z.string().optional(),
});
export type LocationFormValues = z.infer<typeof locationFormSchema>;

export const supplierFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên nhà cung cấp"),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  address: z.string().optional(),
});
export type SupplierFormValues = z.infer<typeof supplierFormSchema>;

export const departmentFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên phòng ban"),
  description: z.string().optional(),
});
export type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

export const workflowFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên quy trình"),
  description: z.string().optional(),
});
export type WorkflowFormValues = z.infer<typeof workflowFormSchema>;

export const approvalRoleFormSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên vai trò"),
  level: z.string().min(1, "Vui lòng nhập cấp bậc"),
});
export type ApprovalRoleFormValues = z.infer<typeof approvalRoleFormSchema>;

export const approvalStepFormSchema = z.object({
  stepOrder: z.string().optional(),
  approvalRoleId: z.string().min(1, "Vui lòng chọn vai trò duyệt"),
});
export type ApprovalStepFormValues = z.infer<typeof approvalStepFormSchema>;
