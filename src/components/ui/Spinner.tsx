import React from "react";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 48 }) => (
  <div className={`inline-block w-[${size}px] h-[${size}px]`}>
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.2"
      />
      <path
        d={`M${size / 2},${size / 2} m0,-${size / 2 - 4} a${size / 2 - 4},${
          size / 2 - 4
        } 0 1,1 0,${size - 8}`}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default Spinner;
