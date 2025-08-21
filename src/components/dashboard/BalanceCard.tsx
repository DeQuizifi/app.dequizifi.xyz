"use client";

import React from "react";
import { CircleDollarSign } from "lucide-react";

interface BalanceCardProps {
  amount: number;
}

export default function BalanceCard({ amount }: BalanceCardProps) {
  const formatBalance = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex-shrink-0">
      <div
        className="bg-balance-card rounded-full p-1 min-w-[80px] flex items-center justify-between mt-4"
        role="region"
        aria-label="Account balance information"
      >
        <span
          className="text-md font-semibold text-balance-foreground tabular-nums px-2"
          aria-label={`Balance: ${formatBalance(amount)}`}
        >
          {formatBalance(amount)}
        </span>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-balance-icon rounded-full flex items-center justify-center">
            <CircleDollarSign className="w-6 h-6 text-balance-icon-foreground" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
