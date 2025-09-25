import Image from "next/image";
import React from "react";

export function UserNameBalance() {
  const name = "SetUserName";

  return (
    <div className="flex items-center justify-between px-4 py-6 max-w-screen-xl mx-auto">
      <div className="flex-1">
        <div className="space-y-1 ml-2">
          <p className="text-lg text-primary-foreground font-bold font-mono opacity-80">
            Welcome
          </p>
          <h1
            className="text-xl font-mono font-bold text-primary-foreground"
            aria-label={`Welcome ${name}`}
          >
            {name}
          </h1>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center px-1 py-1 rounded-full shadow-md">
          <span className="text-sm text-primary-foreground font-bold ml-1">
            60.2
          </span>
          <div className="w-8 h-8 ml-2 rounded-full relative overflow-hidden flex-shrink-0">
            <Image
              src="/images/balanceIcon.svg"
              alt="balance"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
