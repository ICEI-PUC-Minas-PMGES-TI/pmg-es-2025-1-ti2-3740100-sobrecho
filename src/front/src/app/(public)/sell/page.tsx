import { UserPlus, ClipboardCheck, Store } from 'lucide-react';
import Link from 'next/link';

import { Badge, buttonVariants, Card, CardContent } from '@/components/ui';

const steps = [
	{
		step: '1',
		title: 'Crie sua conta',
		description:
			'Cadastre-se no SoBrechó e configure seu perfil para começar a vender suas peças.',
		icon: UserPlus
	},
	{
		step: '2',
		title: 'Configure sua loja',
		description:
			'Personalize sua loja com nome, descrição, fotos e informações de contato para atrair compradores.',
		icon: ClipboardCheck
	},
	{
		step: '3',
		title: 'Comece a vender',
		description:
			'Adicione seus produtos, gerencie anúncios e negocie diretamente com os compradores com total segurança.',
		icon: Store
	}
];

export default function Page() {
	return (
		<main>
			<div className="border-b py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-center text-4xl font-bold">Venda no SoBrechó</h1>
					<p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-xl">
						Transforme seu guarda-roupa em renda extra e contribua para um mundo mais
						sustentável
					</p>
					<div className="mt-8 flex justify-center">
						<Link
							href="/sign-up?as=seller"
							className={buttonVariants({ variant: 'default' })}
						>
							Criar Minha Loja
						</Link>
					</div>
				</div>
			</div>

			<div className="container mx-auto my-12 px-4">
				<div className="grid gap-8 md:grid-cols-3">
					{steps.map((item) => (
						<Card
							key={item.step}
							className="p-8 text-center transition-shadow hover:shadow-lg"
						>
							<CardContent className="space-y-4">
								<div className="bg-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
									<item.icon className="text-background h-8 w-8" />
								</div>
								<div className="space-y-2">
									<Badge variant="outline" className="border-primary text-primary">
										Passo {item.step}
									</Badge>
									<h3 className="text-xl font-semibold">{item.title}</h3>
									<p className="text-muted-foreground">{item.description}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
