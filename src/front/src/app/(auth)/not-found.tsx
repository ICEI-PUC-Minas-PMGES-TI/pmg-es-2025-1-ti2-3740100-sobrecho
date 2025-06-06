'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="min-h-100dvh w-full">
			<div className="mx-auto w-full max-w-md px-6 text-center">
				<div className="mb-8">
					<h1 className="mb-4 text-9xl font-bold text-muted-foreground/25">404</h1>
					<h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
						Página não encontrada
					</h2>
					<p className="mb-8 text-muted-foreground">
						Desculpe, a página que você está procurando não existe ou foi movida.
					</p>
				</div>

				<div className="flex items-center justify-center gap-2">
					<Button variant="ghost" size="icon" onClick={() => router.back()}>
						<ChevronLeft className="size-4" />
					</Button>
					<Link href="/" className={cn('', buttonVariants({ variant: 'default' }))}>
						Voltar para o início
					</Link>
				</div>

				<div className="mt-8 text-sm text-muted-foreground/50">
					<p>Código de erro: 404</p>
				</div>
			</div>
		</div>
	);
}
