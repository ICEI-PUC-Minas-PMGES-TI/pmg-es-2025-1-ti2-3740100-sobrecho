import { cn } from "@/lib/utils";
import { HexagonIcon } from "lucide-react";
import Link from "next/link";

export function Logo({ className, ...props}: React.ComponentProps<typeof Link>) {
    return (
        <Link {...props} className={cn('flex items-center space-x-2', className)}>
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <HexagonIcon className="size-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">SoBrechó</span>
        </Link>
    )
}