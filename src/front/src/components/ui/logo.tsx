import { cn } from '@/lib/utils';
import { HexagonIcon } from 'lucide-react';
import Link from 'next/link';


interface ILogoProps extends React.ComponentProps<typeof Link> {}

export function Logo({ className, ...props }: ILogoProps) {
	return (
		<Link {...props} href="/" className={cn("flex items-center space-x-2", className)}>
			<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
				<HexagonIcon className="size-5 text-primary-foreground" />
			</div>
			<span className="text-lg font-semibold">SoBrechó</span>
		</Link>
	);
}
