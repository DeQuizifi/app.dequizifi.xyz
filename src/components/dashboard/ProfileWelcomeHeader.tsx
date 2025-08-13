"use client";

import Image from "next/image";
import React from "react";

interface ProfileWelcomeHeaderProps {
  name?: string;
}

export default function ProfileWelcomeHeader({ name = "User" }: ProfileWelcomeHeaderProps) {
  return (
    <div className="flex-1">
      <div className="flex space-y-1">
        <Image src="/ProfileIcon.jpg" alt="Profile Icon" width={50} height={50} className="rounded-full mr-3"/>
        <div className="flex flex-col justify-center">
        <h1
          className="text-white text-2xl font-bold"
          aria-label={`Welcome ${name}`}
        >
          {name}
        </h1>
        <p className="text-white text-sm">0x017...9aaB</p>
        </div>
      </div>
    </div>
  );
}
