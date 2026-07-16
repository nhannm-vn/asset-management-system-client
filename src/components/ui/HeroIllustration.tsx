interface HeroIllustrationProps {
  className?: string;
}

/**
 * Minh họa riêng của AssetHub — một chồng "thẻ tài sản" xếp lệch nhau kèm
 * dấu tích trạng thái, gợi liên tưởng trực tiếp đến việc theo dõi/kiểm kê
 * tài sản mà không cần dùng ảnh chụp. Vẽ hoàn toàn bằng SVG nên luôn sắc nét
 * ở mọi kích thước và giữ đúng tông đen — trắng — xám của thương hiệu.
 */
export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg viewBox="0 0 480 360" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* thẻ phía sau cùng, lệch trái */}
      <rect
        x="48"
        y="120"
        width="220"
        height="140"
        rx="18"
        fill="#F5F5F7"
        stroke="#D2D2D7"
        strokeWidth="1.5"
        transform="rotate(-8 158 190)"
      />
      {/* thẻ giữa */}
      <rect
        x="120"
        y="90"
        width="230"
        height="150"
        rx="18"
        fill="#FFFFFF"
        stroke="#D2D2D7"
        strokeWidth="1.5"
        transform="rotate(-2 235 165)"
      />

      {/* thẻ chính, trên cùng */}
      <g transform="rotate(4 300 175)">
        <rect x="185" y="95" width="240" height="160" rx="20" fill="#1D1D1F" />
        {/* các dòng nội dung cách điệu */}
        <rect x="212" y="130" width="120" height="10" rx="5" fill="#FFFFFF" fillOpacity="0.92" />
        <rect x="212" y="152" width="80" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.4" />
        <rect x="212" y="176" width="150" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.4" />
        <rect x="212" y="196" width="100" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.4" />
        {/* mã vạch nhỏ ở đáy thẻ */}
        <g transform="translate(212 222)">
          {[3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3].map((w, i) => (
            <rect key={i} x={i * 7} y="0" width={w} height="16" fill="#FFFFFF" fillOpacity="0.35" />
          ))}
        </g>
      </g>

      {/* huy hiệu dấu tích nổi — trạng thái "đã xác nhận" */}
      <g transform="translate(372 74)">
        <circle cx="26" cy="26" r="26" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="2" />
        <path
          d="M15 26.5 L22 33.5 L37 17.5"
          stroke="#1D1D1F"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* chip trạng thái nhỏ phía dưới trái, tạo nhịp điệu bố cục */}
      <g transform="translate(56 268)">
        <rect width="132" height="34" rx="17" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
        <circle cx="20" cy="17" r="5" fill="#1D1D1F" />
        <rect x="34" y="12" width="82" height="9" rx="4.5" fill="#48484A" />
      </g>
    </svg>
  );
}
