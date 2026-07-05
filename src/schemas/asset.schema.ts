import { z } from "zod";

// Lưu ý: các trường số đến từ <select>/<input type="number"> nên vẫn là
// string ở tầng form; ép kiểu Number() được làm ở nơi submit (không dùng
// z.transform ở đây để tránh lệch kiểu input/output của react-hook-form).
export const assetFormSchema = z.object({
  assetCode: z.string().min(1, "Vui lòng nhập mã tài sản"),
  name: z.string().min(1, "Vui lòng nhập tên tài sản"),
  categoryId: z.string().min(1, "Vui lòng chọn loại tài sản"),
  locationId: z.string().min(1, "Vui lòng chọn vị trí"),
  supplierId: z.string().optional(),
  value: z.string().optional(),
});

export type AssetFormValues = z.infer<typeof assetFormSchema>;

export const assetRequestFormSchema = z.object({
  workflowId: z.string().min(1, "Vui lòng nhập mã quy trình duyệt"),
});

export type AssetRequestFormValues = z.infer<typeof assetRequestFormSchema>;
