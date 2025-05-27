import Link from 'next/link';

import { Header } from '@/components/common';
import { buttonVariants } from '@/components/ui';

import { cn } from '@/lib/utils';
import { ShirtIcon } from 'lucide-react';

const navigation = {
	main: [
		{ label: 'Sobre', href: '/about' },
		{ label: 'Destaques', href: '/featured' }
	],
	auth: [
		{ label: 'Entrar', href: '/sign-in' },
		{ label: 'Cadastrar', href: '/sign-up' }
	]
};

export default function Page() {
	return (
		<>
			<Header className="fixed top-0 flex w-full items-center justify-between p-4">
				<Link
					href="/"
					className="flex items-center justify-center gap-2 text-lg font-semibold"
				>
					<div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<ShirtIcon className="size-5" />
					</div>
					SoBrechó
				</Link>
				<div className="flex items-center justify-center gap-2">
					{navigation.main.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className={cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')}
						>
							{item.label}
						</Link>
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					{navigation.auth.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							className={
								index < navigation.auth.length - 1
									? cn(buttonVariants({ variant: 'ghost' }), 'text-md font-normal')
									: buttonVariants({ variant: 'default' })
							}
						>
							{item.label}
						</Link>
					))}
				</div>
			</Header>
		</>
	);
}