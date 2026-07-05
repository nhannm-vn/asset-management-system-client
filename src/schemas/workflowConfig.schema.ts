import { z } from "zod";

export const departmentWorkflowFormSchema = z.object({
  departmentId: z.string().min(1, "Vui lòng chọn phòng ban"),
  workflowId: z.string().min(1, "Vui lòng chọn quy trình"),
});
export type DepartmentWorkflowFormValues = z.infer<typeof departmentWorkflowFormSchema>;

export const userApprovalRoleFormSchema = z.object({
  userId: z.string().min(1, "Vui lòng chọn người dùng"),
  approvalRoleId: z.string().min(1, "Vui lòng chọn vai trò duyệt"),
  departmentId: z.string().optional(),
});
export type UserApprovalRoleFormValues = z.infer<typeof userApprovalRoleFormSchema>;
