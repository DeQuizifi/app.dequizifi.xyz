import { Button } from "@/components/ui/button";
import React from "react";

function WalletLoginButton() {
  return (
    <div className="px-4 ">
      <Button className="w-full cursor-pointer bg-white text-black rounded-full shadow-xs hover:bg-gray-100 mb-12 py-8 text-lg ">
        Login with Wallet
      </Button>
    </div>
  );
}

export default WalletLoginButton;
