import { Button } from "@/components/ui/button";

type Props = {
  asChild?: boolean;
  children?: React.ReactNode;
};

export function LoginWithWalletButton({ asChild = false, children }: Props) {
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
}
