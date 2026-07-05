import { EntityCrudPage } from "@/components/shared/EntityCrudPage";
import { supplierHooks } from "@/hooks/useCatalog";
import { supplierFormSchema, type SupplierFormValues } from "@/schemas/catalog.schema";
import type { CreateSupplierRequest, SupplierResponse } from "@/types/dto";

export default function SuppliersPage() {
  return (
    <EntityCrudPage<SupplierResponse, SupplierFormValues, CreateSupplierRequest>
      eyebrow="Danh mục"
      title="Nhà cung cấp"
      description="Đối tác cung cấp tài sản cho tổ chức."
      emptyLabel="nhà cung cấp"
      schema={supplierFormSchema}
      defaultValues={{ name: "", contactPerson: "", phone: "", email: "", address: "" }}
      fields={[
        { name: "name", label: "Tên nhà cung cấp", required: true },
        { name: "contactPerson", label: "Người liên hệ" },
        { name: "phone", label: "Số điện thoại" },
        { name: "email", label: "Email" },
        { name: "address", label: "Địa chỉ", type: "textarea" },
      ]}
      columns={[
        { key: "id", label: "#" },
        { key: "name", label: "Tên" },
        { key: "contactPerson", label: "Liên hệ" },
        { key: "phone", label: "SĐT" },
        { key: "email", label: "Email" },
      ]}
      hooks={supplierHooks}
      toFormValues={(item) => ({
        name: item.name,
        contactPerson: item.contactPerson ?? "",
        phone: item.phone ?? "",
        email: item.email ?? "",
        address: item.address ?? "",
      })}
      toPayload={(values) => ({
        name: values.name,
        contactPerson: values.contactPerson || undefined,
        phone: values.phone || undefined,
        email: values.email || undefined,
        address: values.address || undefined,
      })}
    />
  );
}
