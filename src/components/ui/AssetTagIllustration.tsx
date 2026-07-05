interface AssetTagIllustrationProps {
  className?: string;
}

/**
 * Minh họa một thẻ tài sản vật lý thật — có lỗ đục dây treo, đường kẻ đục lỗ
 * (perforation) để xé cuống lưu, và vạch mã vạch + mã số. Đây là yếu tố nhận
 * diện riêng của AssetHub: mọi thứ trong hệ thống xoay quanh một tấm thẻ vật
 * lý được gắn lên tài sản thật, nên trang đăng nhập mở đầu bằng chính vật thể
 * đó thay vì một hoạ tiết trừu tượng.
 */
export function AssetTagIllustration({ className }: AssetTagIllustrationProps) {
  return (
    <svg viewBox="0 0 420 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* thẻ phụ phía sau, lệch nhẹ, tạo chiều sâu */}
      <g transform="rotate(-11 210 160)" opacity="0.35">
        <rect x="130" y="70" width="190" height="120" rx="10" fill="#17212F" stroke="#C68A2E" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>

      {/* dây treo, chui ra từ lỗ đục trên thẻ và kéo dài ra khỏi khung hình */}
      <path
        d="M178 112 C 166 90, 166 66, 180 44"
        stroke="#DBA84E"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
        transform="rotate(6 210 160)"
      />

      {/* thẻ chính */}
      <g transform="rotate(6 210 160)">
        <rect x="110" y="96" width="210" height="132" rx="12" fill="#0D1622" stroke="#C68A2E" strokeWidth="1.5" />
        {/* lỗ đục nằm trên chính thân thẻ */}
        <circle cx="178" cy="112" r="8" fill="#17212F" stroke="#DBA84E" strokeWidth="2" />
        {/* đường kẻ đục lỗ để xé cuống */}
        <line x1="110" y1="140" x2="320" y2="140" stroke="#4C5F73" strokeWidth="1.5" strokeDasharray="4 5" />

        {/* nhãn nhỏ */}
        <text x="128" y="120" fontFamily="'JetBrains Mono', monospace" fontSize="9" letterSpacing="2" fill="#8695A6">
          ASSET TAG
        </text>

        {/* mã số tài sản */}
        <text x="128" y="168" fontFamily="'JetBrains Mono', monospace" fontSize="22" fontWeight="600" fill="#F4E1B8">
          AH-04471
        </text>
        <text x="128" y="188" fontFamily="Inter, sans-serif" fontSize="11" fill="#8695A6">
          MacBook Pro 14" · Kho A
        </text>

        {/* mã vạch */}
        <g transform="translate(128 200)">
          {[3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 3].map((w, i) => {
            const x = i * 8;
            return <rect key={i} x={x} y="0" width={w} height="20" fill="#8695A6" opacity={0.9} />;
          })}
        </g>
      </g>

      {/* chip trạng thái nổi phía trên bên phải */}
      <g transform="rotate(-4 340 90)">
        <rect x="300" y="70" width="88" height="34" rx="17" fill="#4B7A5B" />
        <circle cx="317" cy="87" r="4" fill="#EBF2EC" />
        <text x="330" y="91" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#EBF2EC">
          Sẵn sàng
        </text>
      </g>
    </svg>
  );
}
