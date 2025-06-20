import Image from 'next/image';

import { Badge, Card, CardContent } from '@/components/ui';
import { heroConfig } from '@/config/landing';

export function HeroSection() {
	return (
		<section className="relative overflow-hidden border-b py-20 sm:py-32">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-8">
						<div className="space-y-4">
							<Badge className="text-background bg-primary">Moda Sustentável</Badge>
							<h1 className="text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
								Descubra tesouros únicos em <span className="text-primary">brechós</span>
							</h1>
							<p className="text-muted-foreground text-xl leading-relaxed">
								Marketplace colaborativo onde você encontra peças exclusivas, negocia
								preços diretamente com vendedores e contribui para um mundo mais
								sustentável.
							</p>
						</div>

						<div className="text-muted-foreground flex items-center gap-8 text-sm">
							{heroConfig.map((stat, index) => (
								<div key={index} className="flex items-center gap-2">
									<stat.icon className="text-primary h-5 w-5" />
									<span className="text-muted-foreground">{stat.text}</span>
								</div>
							))}
						</div>
					</div>
					<div className="relative">
						<div className="grid grid-cols-2 gap-4">
							<Card className="rotate-3 transform py-0 transition-transform hover:rotate-6">
								<CardContent className="p-0">
									<Image
										src="/landing/hero.jpg"
										alt="Peça vintage"
										width={1000}
										height={1000}
										priority={false}
										className="h-72 w-full rounded-lg object-cover"
									/>
								</CardContent>
							</Card>
							<Card className="mt-8 -rotate-2 transform py-0 transition-transform hover:-rotate-3">
								<CardContent className="p-0">
									<Image
										src="/landing/hero-1.jpg"
										alt="Acessório único"
										width={1000}
										height={1000}
										priority={false}
										className="h-64 w-full rounded-lg object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
