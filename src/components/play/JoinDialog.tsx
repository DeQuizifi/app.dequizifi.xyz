"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  entryFee?: string;
  currentPrize?: string;
  firstPrize?: string;
  onConfirm?: () => void | Promise<void>;
};

export default function JoinDialog({
  title,
  entryFee = "1 USDC",
  currentPrize = "132 USDC",
  firstPrize = "29.75 USDC",
  onConfirm,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Join ${title}`}
          className="rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground shadow-none"
        >
          Join
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base">Join {title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Confirm your entry
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 grid gap-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Entry Fee:
            </div>
            <div className="text-sm font-semibold">
              {entryFee}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Current Prize Pool:
            </div>
            <div className="text-sm font-semibold">{currentPrize}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              1st Prize:
            </div>
            <div className="text-sm font-semibold">{firstPrize}</div>
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            <p className="mb-1">Note:</p>
            <ul className="list-disc list-inside text-xs">
              <li className="text-muted-foreground">
                10% will go to the platform
              </li>
              <li className="text-muted-foreground">
                All participants get a reward!
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="w-full flex-row gap-2 items-center justify-between mt-6">
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-semibold mr-2 bg-destructive text-destructive-foreground"
            >
              Cancel
            </button>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="button"
              onClick={async () => {
                await onConfirm?.();
              }}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Confirm and Join
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
