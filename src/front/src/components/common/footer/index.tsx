import Link from 'next/link';

import { Logo } from '@/components/ui';

interface IFooterProps {
	onlyCopyright?: boolean;
}

export function Footer({ onlyCopyright }: IFooterProps) {
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
			<footer className="fixed bottom-5 flex w-full items-center justify-center">
				<div className="mt-8 w-full border-t pt-5 text-center text-sm text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</footer>
		);
	}

	return (
		<footer className="border-t bg-background py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<Logo href="/" />
						<p className="text-muted-foreground">
							Marketplace colaborativo de moda usada. Conectando pessoas através da moda
							sustentável.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold ">Comprar</h4>
						<div className="space-y-2 text-sm">
							{footerLinks.comprar.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									className="block text-muted-foreground hover:underline hover:underline-offset-4"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold ">Vender</h4>
						<div className="space-y-2 text-sm">
							{footerLinks.vender.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									className="block text-muted-foreground hover:underline hover:underline-offset-4"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold ">Suporte</h4>
						<div className="space-y-2 text-sm">
							{footerLinks.suporte.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									className="block text-muted-foreground hover:underline hover:underline-offset-4"
								>
									{link.label}
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
					<p>&copy; {new Date().getFullYear()} SoBrechó. Todos os direitos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
