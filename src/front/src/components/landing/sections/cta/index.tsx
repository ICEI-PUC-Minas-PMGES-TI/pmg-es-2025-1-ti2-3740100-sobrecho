import Link from 'next/link';

import { buttonVariants } from '@/components/ui';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
	return (
		<section className="border-t py-20">
			<div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
				<div className="space-y-8">
					<h2 className="text-3xl font-bold sm:text-4xl">
						Pronto para descobrir seu próximo look?
					</h2>
					<p className="mx-auto max-w-2xl text-xl text-muted-foreground">
						Junte-se a milhares de pessoas que já encontraram peças incríveis no SoBrechó
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link
							href="/explore"
							className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'h-10')}
						>
							Começar a comprar
							<ArrowRight />
						</Link>
						<Link
							href="/sell"
							className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'h-10')}
						>
							Vender minhas peças
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
