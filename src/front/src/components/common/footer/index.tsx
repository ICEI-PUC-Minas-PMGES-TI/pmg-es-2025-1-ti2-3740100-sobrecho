'use client'; // necessário se estiver em um arquivo de componente comum fora de rota App

import Link from 'next/link';

import { Logo } from '@/components/ui';
import { cn } from '@/lib/utils';

interface IFooterProps {
	onlyCopyright?: boolean;
	block?: boolean;
}

export function Footer({ onlyCopyright, block }: IFooterProps) {
	const footerLinks = {
		comprar: [
			{ label: 'Explorar', href: '/explorar' },
			{ label: 'Categorias', href: '/explorar?view=categorias' },
			{ label: 'Brechós', href: '/explorar?view=brechos' }
		],
		vender: [
			{ label: 'Como Vender', href: '/vender' },
			{ label: 'Criar Loja', href: '/vender/criar-loja' },
			{ label: 'Dicas', href: '/vender/dicas' }
		],
		suporte: [
			{ label: 'Central de Ajuda', href: '/ajuda' },
			{ label: 'Contato', href: '/contato' },
			{ label: 'Termos', href: '/termos' }
		]
	};

	if (onlyCopyright) {
		return (
			<footer
				className={cn(
					block
						? 'flex w-full items-center justify-center p-5'
						: 'fixed bottom-5 flex w-full items-center justify-center'
				)}
			>
				<div className="text-muted-foreground mt-8 w-full border-t pt-5 text-center text-sm">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</footer>
		);
	}

	return (
		<footer className="bg-background border-t py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<Logo href="/" />
						<p className="text-muted-foreground">
							Marketplace colaborativo de moda usada. Conectando pessoas através da moda
							sustentável.
						</p>
					</div>

					{(['comprar', 'vender', 'suporte'] as const).map((section) => (
						<div key={section} className="space-y-4">
							<h4 className="font-semibold capitalize">{section}</h4>
							<div className="space-y-2 text-sm">
								{footerLinks[section].map((link) => (
									<Link
										key={link.label}
										href={link.href}
										className="text-muted-foreground block hover:underline hover:underline-offset-4"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
