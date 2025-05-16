import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

interface IHeaderProps extends ComponentProps<'header'> {}

export function Header({ children, className, ...props }: IHeaderProps) {
	return (
		<header className={cn('', className)} {...props}>
			{children}
		</header>
	);
}
