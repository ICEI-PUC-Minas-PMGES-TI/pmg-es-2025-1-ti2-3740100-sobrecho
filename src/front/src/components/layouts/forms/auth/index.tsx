import Link from 'next/link';

import { buttonVariants, Card, CardContent, CardDescription, CardTitle } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowLeft, ShirtIcon } from 'lucide-react';
import { CardHeader } from '@/components/ui';

interface IAuthFormLayoutProps {
	title: string;
	description: string;
	children: React.ReactNode;
	recovery?: boolean;
}

export function AuthFormLayout({
	title,
	description,
	children,
	recovery
}: IAuthFormLayoutProps) {
	return (
		<div className="flex w-full max-w-sm flex-col items-center justify-center gap-6">
			<Link
				href="/"
				className="flex w-full items-center justify-center gap-2 font-medium"
			>
				<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<ShirtIcon className="size-4" />
				</div>
				SóBrechó
			</Link>
			<div className="flex w-full flex-col gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">{title}</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent>{children}</CardContent>
				</Card>
			</div>
			{recovery && (
				<Link
					href="/sign-in"
					className={cn(buttonVariants({ variant: 'link' }), 'mx-auto max-w-fit p-0')}
				>
					<ArrowLeft className="size-4" />
					Voltar para o login
				</Link>
			)}
		</div>
	);
}