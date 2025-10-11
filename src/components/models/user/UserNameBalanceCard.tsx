import Image from "next/image";
import React from "react";

export function UserNameBalance() {
  const name = "SetUserName";

  return (
    <div className="flex items-center justify-between px-4 py-6 max-w-screen-xl mx-auto">
      <div className="flex-1">
        <div className="space-y-1 ml-2">
          <h2 id="welcome-greeting" className="text-lg text-primary-foreground font-bold font-mono opacity-80">
            Welcome
          </h2>
          <h1
            className="text-xl font-mono font-bold text-primary-foreground"
            aria-labelledby="welcome-greeting"
            aria-label={`Welcome ${name}`}
          >
            {name}
          </h1>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center bg-primary/20 px-1 py-1 rounded-full shadow-inner backdrop-blur-sm border border-border/30">
          <span className="text-sm text-primary-foreground font-bold ml-1">
            60.2
          </span>
           <div className="w-8 h-8 ml-2 rounded-full relative overflow-hidden flex-shrink-0" role="img" aria-label="Balance Icon">
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
