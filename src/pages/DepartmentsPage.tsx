import { EntityCrudPage } from "@/components/shared/EntityCrudPage";
import { departmentHooks } from "@/hooks/useCatalog";
import { departmentFormSchema, type DepartmentFormValues } from "@/schemas/catalog.schema";
import type { CreateDepartmentRequest, DepartmentResponse } from "@/types/dto";

export default function DepartmentsPage() {
  return (
    <EntityCrudPage<DepartmentResponse, DepartmentFormValues, CreateDepartmentRequest>
      eyebrow="Danh mục"
      title="Phòng ban"
      description="Cơ cấu tổ chức để gán người dùng và quy trình duyệt."
      emptyLabel="phòng ban"
      schema={departmentFormSchema}
      defaultValues={{ name: "", description: "" }}
      fields={[
        { name: "name", label: "Tên phòng ban", required: true },
        { name: "description", label: "Mô tả", type: "textarea" },
      ]}
      columns={[
        { key: "id", label: "#" },
        { key: "name", label: "Tên phòng ban" },
        { key: "description", label: "Mô tả" },
      ]}
      hooks={departmentHooks}
      toFormValues={(item) => ({ name: item.name, description: item.description ?? "" })}
      toPayload={(values) => ({ name: values.name, description: values.description || undefined })}
    />
  );
}
