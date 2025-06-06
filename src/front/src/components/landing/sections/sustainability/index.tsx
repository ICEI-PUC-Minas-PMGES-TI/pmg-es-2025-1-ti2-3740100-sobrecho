import Image from 'next/image';

import { sustainabilityConfig } from '@/config/landing';
import { Leaf } from 'lucide-react';

export function SustainabilitySection() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<Leaf className="h-8 w-8 text-primary" />
							<h2 className="text-3xl font-bold sm:text-4xl">Moda Consciente</h2>
						</div>
						<p className="text-lg leading-relaxed text-muted-foreground">
							Cada compra no SoBrechó é um passo em direção a um futuro mais sustentável.
							Ao dar nova vida às roupas, você reduz o desperdício e apoia a economia
							circular.
						</p>
						<div className="grid grid-cols-2 gap-6">
							{sustainabilityConfig.map((stat, index) => (
								<div key={index} className="text-center">
									<div className="text-2xl font-bold text-primary">{stat.value}</div>
									<div className="text-sm text-muted-foreground">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
					<div className="relative flex justify-center lg:justify-start">
						<Image
							src="/landing/sustainability.png"
							alt="Sustentabilidade"
							width={500}
							height={400}
							className="rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
