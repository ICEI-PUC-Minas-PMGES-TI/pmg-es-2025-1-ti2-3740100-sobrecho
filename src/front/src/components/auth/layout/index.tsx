import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui';

import { cn } from '@/lib/utils';

interface IAuthLayoutProps extends React.ComponentProps<'div'> {
	title?: string;
	description?: string;
}

export function AuthLayout({
	title,
	description,
	className,
	children,
	...props
}: IAuthLayoutProps) {
	return (
		<div className={cn('flex flex-col gap-4', className)} {...props}>
			<Card>
				<CardHeader className="space-y-0">
					<CardTitle className="text-xl">{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</div>
	);
}
