import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold text-foreground", className)}>
      <div className="rounded-lg bg-primary p-2 flex items-center justify-center">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </div>
      OneKit
    </Link>
  );
}
