import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui';
import { cn } from '@/lib/utils';

interface IAuthenticationLayoutProps extends React.ComponentProps<typeof Card> {
	title: string;
	description: string;
}

export function AuthenticationLayout({
	title,
	description,
	className,
	children,
	...props
}: IAuthenticationLayoutProps) {
	return (
		<Card className={cn('flex flex-col gap-4', className)} {...props}>
			<CardHeader className="space-y-0">
				<CardTitle className="text-xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
