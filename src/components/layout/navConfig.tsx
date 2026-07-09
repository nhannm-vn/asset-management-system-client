import {
  LayoutDashboard,
  Boxes,
  Tags,
  MapPin,
  Truck,
  Building2,
  Users,
  ClipboardList,
  CheckSquare,
  Repeat,
  Workflow,
  ShieldCheck,
  GitBranch,
  UserCog,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  roles: Array<"ADMIN" | "USER">;
}

export interface NavSection {
  title?: string;
  /** Số thứ tự bước thiết lập — hiển thị dạng chip số trong Sidebar để admin
   * thấy ngay thứ tự cần làm từ trên xuống. Bỏ trống với mục không thuộc
   * luồng thiết lập (Tổng quan, Vận hành hằng ngày). */
  step?: number;
  roles?: Array<"ADMIN" | "USER">;
  items: NavItem[];
}

/**
 * Thứ tự các mục dưới đây PHẢN ÁNH ĐÚNG luồng thiết lập thật của hệ thống —
 * mỗi bước sau phụ thuộc dữ liệu của bước trước:
 *
 *   Bước 1: Phòng ban / Loại tài sản / Vị trí / Nhà cung cấp
 *           → không phụ thuộc gì, tạo trước tiên.
 *   Bước 2: Người dùng
 *           → cần Phòng ban (bước 1) để gán.
 *   Bước 3: Vai trò duyệt → Quy trình duyệt → Gán quy trình cho phòng ban
 *           → Gán vai trò duyệt cho user
 *           → cần Phòng ban + Người dùng (bước 1, 2); tự thân cũng có thứ tự
 *             con (phải có Vai trò duyệt trước khi thêm bước vào Quy trình).
 *   Bước 4: Tài sản
 *           → cần Loại tài sản / Vị trí / Nhà cung cấp (bước 1).
 *   Vận hành: Yêu cầu / Phê duyệt / Bàn giao / Báo cáo
 *           → chỉ dùng được sau khi 4 bước thiết lập ở trên đã xong.
 */
export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ to: "/dashboard", label: "Tổng quan", icon: LayoutDashboard, roles: ["ADMIN"] }],
  },
  {
    title: "Danh mục nền tảng",
    step: 1,
    roles: ["ADMIN"],
    items: [
      { to: "/departments", label: "Phòng ban", icon: Building2, roles: ["ADMIN"] },
      { to: "/categories", label: "Loại tài sản", icon: Tags, roles: ["ADMIN"] },
      { to: "/locations", label: "Vị trí", icon: MapPin, roles: ["ADMIN"] },
      { to: "/suppliers", label: "Nhà cung cấp", icon: Truck, roles: ["ADMIN"] },
    ],
  },
  {
    title: "Người dùng",
    step: 2,
    roles: ["ADMIN"],
    items: [{ to: "/users", label: "Người dùng", icon: Users, roles: ["ADMIN"] }],
  },
  {
    title: "Quy trình duyệt",
    step: 3,
    roles: ["ADMIN"],
    items: [
      { to: "/approval-roles", label: "1. Vai trò duyệt (định nghĩa)", icon: ShieldCheck, roles: ["ADMIN"] },
      { to: "/workflows", label: "2. Quy trình duyệt (các bước)", icon: Workflow, roles: ["ADMIN"] },
      {
        to: "/department-workflows",
        label: "3. Gán quy trình cho phòng ban",
        icon: GitBranch,
        roles: ["ADMIN"],
      },
      { to: "/user-approval-roles", label: "4. Gán vai trò duyệt cho user", icon: UserCog, roles: ["ADMIN"] },
    ],
  },
  {
    title: "Tài sản",
    step: 4,
    roles: ["ADMIN"],
    items: [{ to: "/assets", label: "Tài sản", icon: Boxes, roles: ["ADMIN"] }],
  },
  {
    title: "Vận hành hằng ngày",
    roles: ["ADMIN"],
    items: [
      { to: "/admin/requests", label: "Yêu cầu (tất cả)", icon: ClipboardList, roles: ["ADMIN"] },
      { to: "/approvals", label: "Phê duyệt", icon: CheckSquare, roles: ["ADMIN"] },
      { to: "/admin/assignments", label: "Bàn giao tài sản", icon: Repeat, roles: ["ADMIN"] },
      { to: "/admin/reports", label: "Báo cáo", icon: FileBarChart, roles: ["ADMIN"] },
    ],
  },
  // --- Menu cho nhân viên (USER) — giữ đơn giản, không cần đánh số bước ---
  {
    roles: ["USER"],
    items: [
      { to: "/assets", label: "Tài sản", icon: Boxes, roles: ["USER"] },
      { to: "/requests", label: "Yêu cầu của tôi", icon: ClipboardList, roles: ["USER"] },
      { to: "/approvals", label: "Phê duyệt", icon: CheckSquare, roles: ["USER"] },
      { to: "/my-assignments", label: "Tài sản đang mượn", icon: Repeat, roles: ["USER"] },
    ],
  },
];
