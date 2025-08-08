"use client";


import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describePieSlice(centerX: number, centerY: number, radius: number, value: number) {
  const endAngle = (value / 100) * 360;
  const start = polarToCartesian(centerX, centerY, radius, 0);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const largeArcFlag = endAngle > 180 ? 1 : 0;

  if (value === 0) {
    // No slice
    return "";
  }
  if (value === 100) {
    // Full circle
    return `\n      M ${centerX},${centerY}\n      m 0,-${radius}\n      a ${radius},${radius} 0 1,1 0,${2 * radius}\n      a ${radius},${radius} 0 1,1 0,-${2 * radius}\n      Z\n    `;
  }

  return [
    `M ${centerX},${centerY}`,
    `L ${start.x},${start.y}`,
    `A ${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y}`,
    "Z",
  ].join(" ");
}

function CircularProgress({
  value,
  size = 64,
  className,
  showValue = true,
}: CircularProgressProps) {
  const radius = size / 2;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden="true">
        {/* Background circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius}
          fill="#2C2357"
        />
        {/* Pie slice */}
        <path
          d={describePieSlice(radius, radius, radius, value)}
          fill="#D485F2"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
}

export { CircularProgress };
