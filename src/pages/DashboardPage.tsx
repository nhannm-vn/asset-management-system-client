import type { LucideIcon } from "lucide-react";
import { Boxes, ClipboardList, Repeat, PackageCheck } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { PageHeader, Spinner } from "@/components/ui/DataDisplay";
import { useDashboardSummaryQuery } from "@/hooks/useAdmin";

// Khớp đúng ngữ nghĩa màu trạng thái dùng trong Badge (xem types/enums.ts)
const ASSET_COLORS = ["#10B981", "#4F46E5", "#F59E0B", "#C3C8D1"]; // Sẵn sàng, Đang dùng, Bảo trì, Khác
const REQUEST_COLORS = ["#F59E0B", "#10B981", "#F43F5E", "#C3C8D1"]; // Chờ duyệt, Đã duyệt, Từ chối, Đã hủy

const STAT_THEME = {
  indigo: { icon: "bg-indigo-600" },
  amber: { icon: "bg-amber-500" },
  emerald: { icon: "bg-emerald-500" },
  slate: { icon: "bg-slate-800" },
} as const;

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  theme: keyof typeof STAT_THEME;
}

function StatCard({ label, value, icon: Icon, theme }: StatCardProps) {
  return (
    <Card interactive className="flex items-center gap-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${STAT_THEME[theme].icon}`}
      >
        <Icon size={19} className="text-white" strokeWidth={2.25} />
      </div>
      <div>
        <p className="text-2xl font-semibold leading-none tracking-tight text-slate-900">{value}</p>
        <p className="mt-1.5 text-xs text-slate-500">{label}</p>
      </div>
    </Card>
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
      value: Math.max(
        0,
        summary.totalAssets - summary.availableAssets - summary.inUseAssets - summary.maintenanceAssets
      ),
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
      <PageHeader
        eyebrow="Tổng quan"
        title="Bảng điều khiển"
        description="Số liệu vận hành tài sản theo thời gian thực."
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tổng số tài sản" value={summary.totalAssets} icon={Boxes} theme="slate" />
        <StatCard
          label="Yêu cầu chờ duyệt"
          value={summary.pendingRequests}
          icon={ClipboardList}
          theme="amber"
        />
        <StatCard label="Đang bàn giao" value={summary.activeAssignments} icon={Repeat} theme="indigo" />
        <StatCard
          label="Đã hoàn trả"
          value={summary.returnedAssignments}
          icon={PackageCheck}
          theme="emerald"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card interactive>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-500">Tài sản</p>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Phân bổ theo trạng thái</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {assetData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={ASSET_COLORS[i % ASSET_COLORS.length]}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #EEF0F3",
                    boxShadow: "0 8px 30px -8px rgba(21,23,27,0.12)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {assetData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: ASSET_COLORS[i % ASSET_COLORS.length] }}
                />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </Card>

        <Card interactive>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-500">Yêu cầu</p>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Yêu cầu mượn theo trạng thái</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6C7480" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#6C7480" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #EEF0F3",
                    boxShadow: "0 8px 30px -8px rgba(21,23,27,0.12)",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={600}>
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
