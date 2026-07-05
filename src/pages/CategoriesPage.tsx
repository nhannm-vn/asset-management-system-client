import { EntityCrudPage } from "@/components/shared/EntityCrudPage";
import { categoryHooks } from "@/hooks/useCatalog";
import { categoryFormSchema, type CategoryFormValues } from "@/schemas/catalog.schema";
import type { AssetCategoryResponse, CreateAssetCategoryRequest } from "@/types/dto";

export default function CategoriesPage() {
  return (
    <EntityCrudPage<AssetCategoryResponse, CategoryFormValues, CreateAssetCategoryRequest>
      eyebrow="Danh mục"
      title="Loại tài sản"
      description="Nhóm tài sản theo loại để dễ lọc và báo cáo."
      emptyLabel="loại tài sản"
      schema={categoryFormSchema}
      defaultValues={{ name: "" }}
      fields={[{ name: "name", label: "Tên loại", required: true, placeholder: "VD: Laptop" }]}
      columns={[
        { key: "id", label: "#" },
        { key: "name", label: "Tên loại" },
      ]}
      hooks={categoryHooks}
      toFormValues={(item) => ({ name: item.name })}
      toPayload={(values) => ({ name: values.name })}
    />
  );
}
