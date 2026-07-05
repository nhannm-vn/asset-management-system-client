import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SelectField } from "@/components/ui/FormField";
import { PageHeader, Table, Thead, Tbody, Spinner, EmptyState } from "@/components/ui/DataDisplay";
import { departmentHooks, workflowHooks } from "@/hooks/useCatalog";
import {
  useCreateDepartmentWorkflow,
  useDepartmentWorkflowsQuery,
  useRemoveDepartmentWorkflow,
} from "@/hooks/useWorkflowConfig";
import {
  departmentWorkflowFormSchema,
  type DepartmentWorkflowFormValues,
} from "@/schemas/workflowConfig.schema";
import type { DepartmentWorkflowResponse } from "@/types/dto";

export default function DepartmentWorkflowsPage() {
  const { data: items = [], isLoading } = useDepartmentWorkflowsQuery();
  const { data: departments = [] } = departmentHooks.useList();
  const { data: workflows = [] } = workflowHooks.useList();
  const createMutation = useCreateDepartmentWorkflow();
  const removeMutation = useRemoveDepartmentWorkflow();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DepartmentWorkflowResponse | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentWorkflowFormValues>({
    resolver: zodResolver(departmentWorkflowFormSchema),
    defaultValues: { departmentId: "", workflowId: "" },
  });

  function departmentName(id: number) {
    return departments.find((d) => d.id === id)?.name ?? `#${id}`;
  }
  function workflowName(id: number) {
    return workflows.find((w) => w.id === id)?.name ?? `#${id}`;
  }

  const onSubmit = handleSubmit((values) => {
    createMutation.mutate(
      { departmentId: Number(values.departmentId), workflowId: Number(values.workflowId) },
      {
        onSuccess: () => {
          setFormOpen(false);
          reset();
        },
      }
    );
  });

  function handleDelete() {
    if (!deleteTarget) return;
    removeMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Quy trình duyệt"
        title="Gán quy trình cho phòng ban"
        description="Mỗi phòng ban dùng một quy trình duyệt riêng khi nhân viên tạo yêu cầu mượn tài sản."
        actions={
          <Button onClick={() => setFormOpen(true)}>
            <Plus size={16} /> Gán mới
          </Button>
        }
      />

      <Card padded={false} className="overflow-hidden">
        {isLoading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <EmptyState title="Chưa có gán quy trình nào" icon={GitBranch} />
        ) : (
          <Table>
            <Thead>
              <th>#</th>
              <th>Phòng ban</th>
              <th>Quy trình</th>
              <th className="text-right">Thao tác</th>
            </Thead>
            <Tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td className="font-mono text-xs text-ink-400">{it.id}</td>
                  <td className="font-medium text-ink-800">{departmentName(it.departmentId)}</td>
                  <td>{workflowName(it.workflowId)}</td>
                  <td className="text-right">
                    <button
                      onClick={() => setDeleteTarget(it)}
                      className="rounded-md p-1.5 text-ink-400 hover:bg-clay-50 hover:text-clay-500"
                      type="button"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Gán quy trình cho phòng ban"
        footer={
          <>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Hủy
            </Button>
            <Button onClick={onSubmit} loading={createMutation.isPending}>
              Lưu
            </Button>
          </>
        }
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          <SelectField label="Phòng ban" required error={errors.departmentId?.message} {...register("departmentId")}>
            <option value="">Chọn phòng ban…</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </SelectField>
          <SelectField label="Quy trình" required error={errors.workflowId?.message} {...register("workflowId")}>
            <option value="">Chọn quy trình…</option>
            {workflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </SelectField>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={removeMutation.isPending}
        title="Gỡ gán quy trình?"
        description="Phòng ban này sẽ không còn dùng quy trình được gán."
      />
    </div>
  );
}
