import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 200, color = "#8B5CF6" }) => (
  <div style={{ display: "inline-block", width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke={color}
        strokeWidth="4"
        fill="none"
        opacity="0.2"
      />
      <path
        d={`M${size / 2},${size / 2} m0,-${size / 2 - 4} a${size / 2 - 4},${
          size / 2 - 4
        } 0 1,1 0,${size - 8}`}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    <style>{`
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Spinner;
