import { Badge, Card, CardContent } from '@/components/ui';
import { howItWorksConfig } from '@/config/landing';

export function HowItWorksSection() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-16 space-y-4 text-center">
					<h2 className="text-3xl font-bold sm:text-4xl">Como Funciona</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">
						Simples, seguro e direto. Conectamos você aos melhores brechós do Brasil
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{howItWorksConfig.map((item) => (
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
		</section>
	);
}
