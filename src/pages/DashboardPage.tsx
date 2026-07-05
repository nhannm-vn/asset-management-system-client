import { Boxes, ClipboardList, Repeat, PackageCheck } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/Card";
import { PageHeader, Spinner } from "@/components/ui/DataDisplay";
import { useDashboardSummaryQuery } from "@/hooks/useAdmin";

const ASSET_COLORS = ["#4B7A5B", "#425870", "#C68A2E", "#9BADB8"];
const REQUEST_COLORS = ["#C68A2E", "#4B7A5B", "#B0492E", "#9BADB8"];

interface ManifestItemProps {
  label: string;
  value: number;
  icon: typeof Boxes;
  accent?: "brass" | "moss";
}

function ManifestItem({ label, value, icon: Icon, accent }: ManifestItemProps) {
  const accentClass = accent === "brass" ? "text-brass-500" : accent === "moss" ? "text-moss-500" : "text-ink-400";
  return (
    <div className="flex flex-1 items-center gap-3.5 px-6 py-5 first:pl-0 last:pr-0">
      <Icon size={17} className={accentClass} strokeWidth={2.25} />
      <div>
        <p className="font-mono text-[26px] font-semibold leading-none tracking-tight text-ink-900">{value}</p>
        <p className="mt-1.5 text-xs text-ink-500">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: summary, isLoading } = useDashboardSummaryQuery();

  if (isLoading) return <Spinner label="Đang tải tổng quan…" />;
  if (!summary) return null;

  const assetData = [
    { name: "Sẵn sàng", value: summary.availableAssets },
    { name: "Đang dùng", value: summary.inUseAssets },
    { name: "Bảo trì", value: summary.maintenanceAssets },
    {
      name: "Khác",
      value: Math.max(0, summary.totalAssets - summary.availableAssets - summary.inUseAssets - summary.maintenanceAssets),
    },
  ].filter((d) => d.value > 0);

  const requestData = [
    { name: "Chờ duyệt", value: summary.pendingRequests },
    { name: "Đã duyệt", value: summary.approvedRequests },
    { name: "Từ chối", value: summary.rejectedRequests },
    { name: "Đã hủy", value: summary.cancelledRequests },
  ];

  return (
    <div>
      <PageHeader eyebrow="Tổng quan" title="Bảng điều khiển" description="Số liệu vận hành tài sản theo thời gian thực." />

      {/* Dải "manifest" — trình bày như 1 dòng sổ kiểm kê, không phải 4 thẻ rời rạc */}
      <Card padded={false} className="mb-5 flex flex-wrap divide-x divide-ink-100 px-6">
        <ManifestItem label="Tổng số tài sản" value={summary.totalAssets} icon={Boxes} />
        <ManifestItem label="Yêu cầu chờ duyệt" value={summary.pendingRequests} icon={ClipboardList} accent="brass" />
        <ManifestItem label="Đang bàn giao" value={summary.activeAssignments} icon={Repeat} accent="moss" />
        <ManifestItem label="Đã hoàn trả" value={summary.returnedAssignments} icon={PackageCheck} />
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-brass-600">Tài sản</p>
          <h3 className="mb-4 text-base font-semibold text-ink-900">Phân bổ theo trạng thái</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {assetData.map((_, i) => (
                    <Cell key={i} fill={ASSET_COLORS[i % ASSET_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {assetData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs text-ink-500">
                <span className="h-2 w-2 rounded-full" style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-brass-600">Yêu cầu</p>
          <h3 className="mb-4 text-base font-semibold text-ink-900">Yêu cầu mượn theo trạng thái</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBEEF2" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#5E7086" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#5E7086" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#F5F6F8" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {requestData.map((_, i) => (
                    <Cell key={i} fill={REQUEST_COLORS[i % REQUEST_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
