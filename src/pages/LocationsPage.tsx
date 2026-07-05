import { EntityCrudPage } from "@/components/shared/EntityCrudPage";
import { locationHooks } from "@/hooks/useCatalog";
import { locationFormSchema, type LocationFormValues } from "@/schemas/catalog.schema";
import type { CreateLocationRequest, LocationResponse } from "@/types/dto";

export default function LocationsPage() {
  return (
    <EntityCrudPage<LocationResponse, LocationFormValues, CreateLocationRequest>
      eyebrow="Danh mục"
      title="Vị trí lưu trữ"
      description="Kho, phòng ban, chi nhánh nơi tài sản được đặt."
      emptyLabel="vị trí"
      schema={locationFormSchema}
      defaultValues={{ name: "", address: "" }}
      fields={[
        { name: "name", label: "Tên vị trí", required: true, placeholder: "VD: Kho A - Tầng 2" },
        { name: "address", label: "Địa chỉ", placeholder: "Địa chỉ chi tiết (tuỳ chọn)" },
      ]}
      columns={[
        { key: "id", label: "#" },
        { key: "name", label: "Tên vị trí" },
        { key: "address", label: "Địa chỉ" },
      ]}
      hooks={locationHooks}
      toFormValues={(item) => ({ name: item.name, address: item.address ?? "" })}
      toPayload={(values) => ({ name: values.name, address: values.address || undefined })}
    />
  );
}
