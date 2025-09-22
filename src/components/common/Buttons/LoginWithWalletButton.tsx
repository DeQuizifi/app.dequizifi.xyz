import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  asChild?: boolean;
  children?: React.ReactNode;
};

const LoginWithWalletButton: React.FC<Props> = ({
  asChild = false,
  children,
}) => {
  return (
    <Button
      asChild={asChild}
      variant="outline"
      size="lg"
      className="w-full justify-center rounded-full bg-background text-foreground font-semibold"
    >
      {children ?? "LOGIN WITH WALLET"}
    </Button>
  );
};

export default LoginWithWalletButton;
