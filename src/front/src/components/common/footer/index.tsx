import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

interface IFooterProps extends ComponentProps<'footer'> {}

export function Footer({ className, ...props }: IFooterProps) {
	return (
		<footer
			className={cn('fixed bottom-5 flex w-full items-center justify-center', className)}
			{...props}
		>
			<p className="text-sm leading-loose text-muted-foreground">
				&copy; {new Date().getFullYear()} SoBrechó.
			</p>
		</footer>
	);
}
