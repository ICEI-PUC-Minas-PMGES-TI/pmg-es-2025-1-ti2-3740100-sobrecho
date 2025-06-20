import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui';
import { categoriesConfig } from '@/config/landing';

export function CategorySection() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-12 space-y-4 text-center">
					<h2 className="text-3xl font-bold sm:text-4xl">Explore por Categoria</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
						Encontre exatamente o que procura em nossa seleção curada de peças únicas
					</p>
				</div>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
					{categoriesConfig.map((category) => (
						<Link key={category.name} href={`/explorar/categoria/${category.slug}`}>
							<Card className="group cursor-pointer py-0 transition-all duration-300 hover:shadow-lg">
								<CardContent className="p-0">
									<div className="relative overflow-hidden rounded-t-lg">
										<Image
											src={category.image || 'https://placehold.co/500?text=x'}
											alt={category.name}
											width={1000}
											height={1000}
											priority={false}
											className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
									</div>
									<div className="p-4 text-center">
										<h3 className="font-semibold">{category.name}</h3>
										<p className="text-muted-foreground text-sm">
											{category.count} peças
										</p>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
