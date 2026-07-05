# AssetHub — Frontend TypeScript cho Asset Management System

Bản viết lại bằng **TypeScript**: TanStack Query, React Hook Form + Zod,
Zustand, Axios typed, Tailwind + class-variance-authority, sonner, SignalR,
Recharts. Type khớp từng field với DTO thật trong
`AssetManagementSystem.Common/Dtos`.

## Vì sao cần chạy qua dev proxy để đăng nhập được

Backend set cookie đăng nhập với:

```csharp
Secure = true,
SameSite = SameSiteMode.Strict
```

`SameSite=Strict` nghĩa là trình duyệt **chỉ gửi cookie này trên request
same-origin**. Nếu FE chạy ở `localhost:5173` gọi thẳng sang BE ở
`localhost:7146`, đó là 2 origin khác nhau (khác port) → trình duyệt sẽ
không đính kèm cookie ở các request sau khi login, dẫn đến 401 dù login
trả về 200. Đây là hành vi bảo mật chuẩn của trình duyệt, không phải lỗi
CORS nên có bật CORS ở backend cũng không giải quyết được.

**Giải pháp:** `vite.config.ts` proxy toàn bộ `/api` và `/hubs` sang backend
thật. Trình duyệt chỉ thấy một origin duy nhất (`localhost:5173`) nên
cookie hoạt động bình thường. Không cần chỉnh gì ở backend cho dev, và
**không cần HTTPS hay chứng chỉ tự ký** — `Secure=true` vẫn hoạt động qua
HTTP thường trên `localhost`, vì trình duyệt coi `http://localhost` là
"secure context" theo đúng chuẩn W3C (ngoại lệ dành cho local dev).

## Chạy dự án

```bash
# 1. Chạy backend .NET trước
cd AssetManagementSystem.API
dotnet run

# 2. Chạy frontend
cd frontend-ts
npm install
cp .env.example .env   # sửa VITE_BACKEND_TARGET nếu backend chạy khác port
npm run dev
```

Mở `http://localhost:5173`, đăng nhập bằng **Email + Password** — không có
bước phụ nào khác.

## Triển khai production (FE/BE khác domain)

Khi build (`npm run build`) và deploy thật, không còn dev-proxy nữa. Khi đó:

1. Set `VITE_API_BASE_URL` và `VITE_HUB_URL` trỏ đúng domain backend trong
   file `.env` lúc build.
2. Backend bật CORS + `AllowCredentials` cho đúng domain FE:
   ```csharp
   builder.Services.AddCors(o => o.AddPolicy("Frontend", p => p
       .WithOrigins("https://your-frontend-domain.com")
       .AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
   app.UseCors("Frontend");
   ```
3. Vì cookie vẫn `SameSite=Strict`, cách chắc chắn nhất để hoạt động ổn
   định là đặt FE và BE **cùng domain** qua reverse proxy (Nginx/Cloudflare),
   ví dụ `your-domain.com` (FE) và `your-domain.com/api` (BE) — tránh mọi
   rắc rối SameSite khi lên production thật.

## Các điểm backend nên cải thiện thêm (không bắt buộc để chạy được)

- `NotificationHub` đang comment `[Authorize]` → realtime theo đúng user
  chưa hoạt động chuẩn; app vẫn ổn nhờ polling 30 giây.
- `POST /api/auth/refresh-token` đang có `[Authorize]` → chỉ refresh được
  khi access token còn hạn, nên bỏ attribute này để đúng chuẩn refresh flow.
- Không có `GET /api/roles` → form tạo user cần nhập Role ID thủ công.
- `GET /api/workflows` chỉ ADMIN gọi được → nhân viên phải tự nhập
  Workflow ID khi gửi yêu cầu mượn tài sản. Nên thêm endpoint công khai,
  ví dụ `GET /api/department-workflows/me`.

## Kiến trúc

```
src/
  types/           -> dto.ts (khớp backend), enums.ts
  lib/             -> axios.ts (interceptor unwrap ApiResponse<T> + auto refresh), queryClient.ts, jwt.ts, cn.ts, format.ts
  api/             -> 1 file client / controller BE
  hooks/           -> TanStack Query cho từng domain
  store/           -> authStore.ts (Zustand)
  schemas/         -> Zod schema / form
  components/ui/   -> Button, Badge (cva), Modal, FormField, DataDisplay
  components/layout-> Sidebar, Topbar, NotificationBell, AppLayout, ProtectedRoute
  components/shared-> EntityCrudPage<TResponse, TFormValues, TPayload>
  pages/           -> theo từng nhóm chức năng
```

## Tài khoản đăng nhập

Đăng nhập bằng **Email + Password**. Vai trò đọc từ claim `role` trong JWT
trả kèm lúc login (không đọc từ cookie HttpOnly, vì JS không đọc được cookie
đó — đây là chủ đích bảo mật của backend).
