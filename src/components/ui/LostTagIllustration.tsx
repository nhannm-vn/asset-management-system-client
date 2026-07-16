interface LostTagIllustrationProps {
  className?: string;
}

/** Thẻ tài sản bị "đứt dây", gợi ý trang này đã lạc mất — nhất quán với
 * biểu tượng AssetTag dùng xuyên suốt sản phẩm, thay vì icon rời rạc. */
export function LostTagIllustration({ className }: LostTagIllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 20 C 92 34, 92 46, 100 58"
        stroke="#D2D2D7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />

      <g transform="rotate(-8 100 105)">
        <rect x="45" y="60" width="110" height="88" rx="14" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
        <circle cx="100" cy="80" r="6" fill="#F5F5F7" stroke="#AEAEB2" strokeWidth="2" />
        <line x1="62" y1="100" x2="138" y2="100" stroke="#E8E8ED" strokeWidth="1.5" strokeDasharray="3 4" />
        <text
          x="100"
          y="126"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="22"
          fontWeight="600"
          fill="#1D1D1F"
        >
          404
        </text>
      </g>
    </svg>
  );
}
