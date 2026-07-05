import { EntityCrudPage } from "@/components/shared/EntityCrudPage";
import { approvalRoleHooks } from "@/hooks/useCatalog";
import { approvalRoleFormSchema, type ApprovalRoleFormValues } from "@/schemas/catalog.schema";
import type { ApprovalRoleResponse, CreateApprovalRoleRequest } from "@/types/dto";

export default function ApprovalRolesPage() {
  return (
    <EntityCrudPage<ApprovalRoleResponse, ApprovalRoleFormValues, CreateApprovalRoleRequest>
      eyebrow="Quy trình duyệt"
      title="Vai trò duyệt"
      description="Các vai trò tham gia chuỗi phê duyệt, sắp xếp theo cấp bậc (level)."
      emptyLabel="vai trò duyệt"
      schema={approvalRoleFormSchema}
      defaultValues={{ name: "", level: "" }}
      fields={[
        { name: "name", label: "Tên vai trò", required: true, placeholder: "VD: Trưởng phòng" },
        { name: "level", label: "Cấp bậc", type: "number", required: true, placeholder: "1" },
      ]}
      columns={[
        { key: "id", label: "#" },
        { key: "name", label: "Tên vai trò" },
        { key: "level", label: "Cấp bậc" },
      ]}
      hooks={approvalRoleHooks}
      toFormValues={(item) => ({ name: item.name, level: String(item.level) })}
      toPayload={(values) => ({ name: values.name, level: Number(values.level) })}
    />
  );
}
