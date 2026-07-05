import type { Config } from "tailwindcss";

export default {
  // BUG QUAN TRỌNG đã sửa: glob cũ chỉ quét .js/.jsx nên hầu hết class
  // Tailwind dùng trong .tsx không được sinh ra -> giao diện gần như không
  // có style. Phải quét đúng .ts/.tsx.
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Warehouse ledger" — nền giấy lưu trữ ấm + mực navy đậm, tách biệt
        // hẳn khỏi tông kem+serif hay near-black+neon thường gặp.
        canvas: "#F6F4EE",
        ink: {
          25: "#F5F6F8",
          50: "#EBEEF2",
          100: "#D6DCE3",
          200: "#AEB9C6",
          300: "#8695A6",
          400: "#5E7086",
          500: "#425870",
          600: "#324459",
          700: "#243244",
          800: "#17212F",
          900: "#0D1622",
          950: "#080E17",
        },
        // Steel — xanh xám trung tính cho text phụ / viền nhấn
        steel: {
          50: "#F1F4F6",
          100: "#DCE3E8",
          300: "#9BADB8",
          500: "#4C5F73",
        },
        // Brass — màu đồng thau/ánh kim của thẻ tài sản thật, ấm và trầm
        // hơn amber mặc định của Tailwind, tránh cảm giác "SaaS mặc định".
        brass: {
          50: "#FBF3E3",
          100: "#F4E1B8",
          200: "#E9C583",
          300: "#DBA84E",
          400: "#C68A2E",
          500: "#A8711F",
          600: "#855817",
          700: "#5F3F10",
          800: "#432C0B",
        },
        // Moss — xanh rêu trầm cho trạng thái tích cực/sẵn sàng
        moss: {
          50: "#EBF2EC",
          100: "#CFE0D3",
          200: "#A9CAB1",
          300: "#7FAF8C",
          400: "#5C8F6C",
          500: "#4B7A5B",
          600: "#396047",
          700: "#294636",
        },
        // Clay — đất nung trầm cho cảnh báo/từ chối, khác hẳn cam Claude
        clay: {
          50: "#F6EAE4",
          100: "#E8CBBC",
          200: "#D9A98F",
          300: "#CB8768",
          400: "#C06D48",
          500: "#B0492E",
          600: "#8C3821",
          700: "#682917",
        },
      },
      fontFamily: {
        // Serif hiển thị có cá tính cho tiêu đề lớn — điểm nhấn riêng biệt,
        // dùng tiết chế (chỉ tiêu đề), không phải toàn trang.
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(13, 22, 34, 0.05), 0 1px 3px 0 rgba(13, 22, 34, 0.07)",
        pop: "0 12px 32px -6px rgba(13, 22, 34, 0.22)",
        glow: "0 0 0 1px rgba(198, 138, 46, 0.18), 0 6px 20px -4px rgba(198, 138, 46, 0.38)",
        soft: "0 2px 10px -3px rgba(13, 22, 34, 0.12)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        // Texture "sổ cái" — các dòng kẻ mảnh gợi liên tưởng sổ kiểm kê thật,
        // dùng độ mờ rất thấp làm nền trang trí, không cạnh tranh nội dung.
        "ledger-lines":
          "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 28px)",
        "ink-mesh":
          "radial-gradient(circle at 12% 15%, rgba(198,138,46,0.16), transparent 42%), radial-gradient(circle at 88% -5%, rgba(76,95,115,0.4), transparent 48%), radial-gradient(circle at 50% 105%, rgba(198,138,46,0.08), transparent 55%)",
        "brass-fade": "linear-gradient(135deg, #DBA84E 0%, #C68A2E 55%, #A8711F 100%)",
        "ink-fade": "linear-gradient(160deg, #17212F 0%, #0D1622 100%)",
      },
      borderRadius: {
        tag: "6px",
      },
    },
  },
  plugins: [],
} satisfies Config;
