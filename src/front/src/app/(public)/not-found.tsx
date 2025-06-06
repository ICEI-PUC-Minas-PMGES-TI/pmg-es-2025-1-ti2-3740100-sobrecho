import Link from 'next/link';

import { Button } from '@/components/ui';

export default function Page() {
	return (
		<main>
			<div className="border-b py-16">
				<div className="container mx-auto px-4">
					<div className="space-y-6 text-center">
						<div className="space-y-2">
							<h1 className="text-6xl font-bold text-muted-foreground">404</h1>
							<h2 className="text-4xl font-bold">Página não encontrada</h2>
						</div>
						<p className="mx-auto max-w-md text-lg text-muted-foreground">
							Desculpe, a página que você está procurando não existe ou foi movida.
						</p>
						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Button asChild>
								<Link href="/">Voltar ao início</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/contato">Entrar em contato</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
