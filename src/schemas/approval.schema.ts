import { z } from "zod";

export const approvalActionFormSchema = z.object({
  comment: z.string().optional(),
});
export type ApprovalActionFormValues = z.infer<typeof approvalActionFormSchema>;
