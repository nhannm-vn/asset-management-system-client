import { useState } from "react";
import { Repeat, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PlainInput } from "@/components/ui/FormField";
import { PageHeader, Table, Thead, Tbody, TableSkeleton, EmptyState } from "@/components/ui/DataDisplay";
import { useAdminAssignmentsQuery } from "@/hooks/useAssignments";
import { ASSIGNMENT_STATUS_META, statusMeta } from "@/types/enums";
import { formatDate } from "@/lib/format";

export default function AdminAssignmentsPage() {
  const { data: items = [], isLoading } = useAdminAssignmentsQuery();
  const [query, setQuery] = useState("");

  const filtered = query
    ? items.filter((it) => JSON.stringify(it).toLowerCase().includes(query.toLowerCase()))
    : items;

  return (
    <div>
      <PageHeader eyebrow="Vận hành" title="Bàn giao tài sản" description="Toàn bộ lịch sử bàn giao và thu hồi tài sản." />

      <Card padded={false} className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-ink-100 px-4 py-3">
          <div className="relative w-full max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <PlainInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tài sản, người dùng…"
              className="h-9 pl-8"
            />
          </div>
          <span className="ml-auto text-xs text-ink-400">{filtered.length} bản ghi</span>
        </div>

        {isLoading ? (
          <Table>
            <Thead>
              <th>Tài sản</th>
              <th>Người nhận</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
            </Thead>
            <TableSkeleton rows={5} cols={5} />
          </Table>
        ) : filtered.length === 0 ? (
          <EmptyState title="Chưa có bàn giao nào" icon={Repeat} />
        ) : (
          <Table>
            <Thead>
              <th>Tài sản</th>
              <th>Người nhận</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
            </Thead>
            <Tbody>
              {filtered.map((a) => {
                const meta = statusMeta(ASSIGNMENT_STATUS_META, a.status);
                return (
                  <tr key={a.id}>
                    <td className="font-medium text-ink-800">{a.assetName}</td>
                    <td className="text-ink-500">{a.userName}</td>
                    <td className="text-ink-500">{formatDate(a.assignedDate)}</td>
                    <td className="text-ink-500">{formatDate(a.returnedDate)}</td>
                    <td>
                      <Badge color={meta.color}>{meta.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
