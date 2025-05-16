import Link from 'next/link';

import {
	buttonVariants,
	Card,
	CardContent,
	CardDescription,
	CardTitle
} from '@/components/ui';
import { CardHeader } from '@/components/ui';

import { cn } from '@/lib/utils';
import { ArrowLeft, ShirtIcon } from 'lucide-react';

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
				className="flex w-full items-center justify-center gap-4 text-lg font-bold"
			>
				<div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<ShirtIcon className="size-5" />
				</div>
				SoBrechó
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
