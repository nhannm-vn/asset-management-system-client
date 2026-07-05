import { useState } from "react";
import { ClipboardList, History } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { PageHeader, Table, Thead, Tbody, TableSkeleton, EmptyState, Spinner } from "@/components/ui/DataDisplay";
import { useAdminRequestsQuery, useRequestHistoryQuery } from "@/hooks/useApprovals";
import { ASSET_REQUEST_STATUS_META, APPROVAL_STATUS_META, statusMeta } from "@/types/enums";
import { formatDateTime } from "@/lib/format";
import type { AdminRequestSummary } from "@/types/dto";

export default function AdminRequestsPage() {
  const { data: requests = [], isLoading } = useAdminRequestsQuery();
  const [historyTarget, setHistoryTarget] = useState<AdminRequestSummary | null>(null);
  const { data: history = [], isLoading: historyLoading } = useRequestHistoryQuery(historyTarget?.id ?? null, true);

  return (
    <div>
      <PageHeader eyebrow="Vận hành" title="Yêu cầu mượn tài sản" description="Toàn bộ yêu cầu mượn tài sản trong hệ thống." />

      <Card padded={false} className="overflow-hidden">
        {isLoading ? (
          <Table>
            <Thead>
              <th>#</th>
              <th>Tài sản</th>
              <th>Người yêu cầu</th>
              <th>Bước</th>
              <th>Trạng thái</th>
              <th>Ngày gửi</th>
              <th className="text-right">Thao tác</th>
            </Thead>
            <TableSkeleton rows={5} cols={7} />
          </Table>
        ) : requests.length === 0 ? (
          <EmptyState title="Chưa có yêu cầu nào" icon={ClipboardList} />
        ) : (
          <Table>
            <Thead>
              <th>#</th>
              <th>Tài sản</th>
              <th>Người yêu cầu</th>
              <th>Bước</th>
              <th>Trạng thái</th>
              <th>Ngày gửi</th>
              <th className="text-right">Thao tác</th>
            </Thead>
            <Tbody>
              {requests.map((r) => {
                const meta = statusMeta(ASSET_REQUEST_STATUS_META, r.status);
                return (
                  <tr key={r.id}>
                    <td className="font-mono text-xs text-ink-400">{r.id}</td>
                    <td className="font-medium text-ink-800">{r.assetName}</td>
                    <td className="text-ink-500">{r.requesterName}</td>
                    <td className="text-ink-500">Bước {r.currentStep}</td>
                    <td>
                      <Badge color={meta.color}>{meta.label}</Badge>
                    </td>
                    <td className="text-ink-500">{formatDateTime(r.createdAt)}</td>
                    <td className="text-right">
                      <button
                        onClick={() => setHistoryTarget(r)}
                        className="rounded-md p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-700"
                        title="Lịch sử duyệt"
                        type="button"
                      >
                        <History size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Card>

      <Modal open={!!historyTarget} onClose={() => setHistoryTarget(null)} title={`Lịch sử duyệt — Yêu cầu #${historyTarget?.id ?? ""}`}>
        {historyLoading ? (
          <Spinner />
        ) : history.length === 0 ? (
          <EmptyState title="Chưa có lịch sử duyệt" />
        ) : (
          <ol className="flex flex-col gap-2">
            {history.map((h, idx) => {
              const meta = statusMeta(APPROVAL_STATUS_META, h.status);
              return (
                <li key={idx} className="rounded-lg border border-ink-100 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink-800">Bước {h.stepOrder}</span>
                    <Badge color={meta.color}>{meta.label}</Badge>
                  </div>
                  {h.comment && <p className="mt-1 text-sm text-ink-500">"{h.comment}"</p>}
                  <p className="mt-1 text-xs text-ink-400">{formatDateTime(h.createdAt)}</p>
                </li>
              );
            })}
          </ol>
        )}
      </Modal>
    </div>
  );
}
