import React from 'react';

export const CornBackgroundPattern: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.1,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Corn Cob 1 (Top Left) */}
          <g transform="translate(80, 60) rotate(-25) scale(0.9)">
            {/* Stalk & Leaves */}
            <path d="M50 160 C 40 120, 20 80, -20 60" fill="none" />
            <path d="M50 160 C 70 110, 110 70, 140 50" fill="none" />
            <path d="M50 170 L 50 220" />
            {/* Cob outline */}
            <path
              d="M30 40 C 30 15, 45 5, 55 5 C 65 5, 80 15, 80 40 L 80 130 C 80 145, 65 155, 55 155 C 45 155, 30 145, 30 130 Z"
              fill="rgba(255,255,255,0.06)"
            />
            {/* Corn kernels grid */}
            <line x1="42" y1="20" x2="42" y2="140" strokeDasharray="3 4" />
            <line x1="55" y1="12" x2="55" y2="148" strokeDasharray="3 4" />
            <line x1="68" y1="20" x2="68" y2="140" strokeDasharray="3 4" />
            {/* Horizontal rows */}
            <path d="M 32 45 Q 55 50 78 45" />
            <path d="M 31 65 Q 55 70 79 65" />
            <path d="M 31 85 Q 55 90 79 85" />
            <path d="M 31 105 Q 55 110 79 105" />
            <path d="M 32 125 Q 55 130 78 125" />
          </g>

          {/* Curved Leaf (Center Left) */}
          <path
            d="M 120 450 C 180 400, 250 420, 310 500 C 260 520, 180 520, 120 450 Z"
            fill="rgba(255,255,255,0.04)"
            transform="rotate(15 210 470)"
          />

          {/* Corn Cob 2 (Top Right) */}
          <g transform="translate(1260, 40) rotate(35) scale(0.85)">
            <path
              d="M30 40 C 30 15, 45 5, 55 5 C 65 5, 80 15, 80 40 L 80 130 C 80 145, 65 155, 55 155 C 45 155, 30 145, 30 130 Z"
              fill="rgba(255,255,255,0.06)"
            />
            <line x1="42" y1="20" x2="42" y2="140" strokeDasharray="3 4" />
            <line x1="55" y1="12" x2="55" y2="148" strokeDasharray="3 4" />
            <line x1="68" y1="20" x2="68" y2="140" strokeDasharray="3 4" />
            <path d="M 32 45 Q 55 50 78 45" />
            <path d="M 31 75 Q 55 80 79 75" />
            <path d="M 31 105 Q 55 110 79 105" />
          </g>

          {/* Large graceful maize leaf (Bottom Left) */}
          <path
            d="M -40 780 C 120 700, 260 740, 360 850 C 240 880, 100 870, -40 780 Z"
            fill="rgba(255,255,255,0.05)"
          />

          {/* Floating leaf (Center Bottom) */}
          <path
            d="M 680 820 C 740 760, 830 770, 890 840 C 820 860, 740 860, 680 820 Z"
            fill="rgba(255,255,255,0.04)"
            transform="rotate(-10 780 820)"
          />

          {/* Corn Cob 3 (Center Right) */}
          <g transform="translate(1320, 620) rotate(-20) scale(0.95)">
            <path
              d="M30 40 C 30 15, 45 5, 55 5 C 65 5, 80 15, 80 40 L 80 130 C 80 145, 65 155, 55 155 C 45 155, 30 145, 30 130 Z"
              fill="rgba(255,255,255,0.06)"
            />
            <line x1="42" y1="20" x2="42" y2="140" strokeDasharray="3 4" />
            <line x1="55" y1="12" x2="55" y2="148" strokeDasharray="3 4" />
            <line x1="68" y1="20" x2="68" y2="140" strokeDasharray="3 4" />
          </g>

          {/* Scattered organic corn grains */}
          <circle cx="280" cy="180" r="7" fill="rgba(255,255,255,0.08)" stroke="none" />
          <circle cx="310" cy="210" r="5" fill="rgba(255,255,255,0.06)" stroke="none" />
          <circle cx="890" cy="110" r="8" fill="rgba(255,255,255,0.07)" stroke="none" />
          <circle cx="1140" cy="280" r="6" fill="rgba(255,255,255,0.06)" stroke="none" />
          <circle cx="540" cy="740" r="7" fill="rgba(255,255,255,0.07)" stroke="none" />
          <circle cx="1020" cy="760" r="8" fill="rgba(255,255,255,0.08)" stroke="none" />
        </g>
      </svg>
    </div>
  );
};
