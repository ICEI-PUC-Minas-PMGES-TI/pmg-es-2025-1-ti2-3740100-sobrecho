'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { ChevronLeftIcon, Home } from 'lucide-react';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12">
			<div className="w-full max-w-md space-y-8 text-center">
				<div className="space-y-2">
					<h1 className="select-none text-8xl font-bold text-muted-foreground/25">404</h1>
					<div className="mx-auto h-1 w-24 rounded-full bg-primary"></div>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold text-foreground">
						Página não encontrada
					</h2>
					<p className="leading-relaxed text-muted-foreground">
						A página que você está procurando não existe ou foi movida para outro local.
					</p>
				</div>
				<div className="mx-auto flex max-w-sm items-center justify-center gap-2">
					<Button onClick={() => router.back()} size="icon" variant="ghost">
						<ChevronLeftIcon className="size-4" />
					</Button>
					<Button asChild className="w-full flex-1">
						<Link href="/">
							<Home className="mr-2 size-4" />
							Voltar ao início
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
