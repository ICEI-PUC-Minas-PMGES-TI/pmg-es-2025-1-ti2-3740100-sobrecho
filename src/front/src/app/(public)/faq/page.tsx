'use client';

import Link from 'next/link';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui';

export default function Page() {
	return (
		<section>
			<div className="border-b py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-center text-4xl font-bold">Perguntas frequentes</h1>
					<p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-xl">
						Tire suas dúvidas sobre como vender, comprar e utilizar o SoBrechó com
						segurança e praticidade.
					</p>
				</div>
			</div>
			<Accordion type="single" collapsible className="mx-auto w-full max-w-2xl py-12">
				<AccordionItem value="item-1">
					<AccordionTrigger>
						Como posso vender minhas roupas no SoBrechó?
					</AccordionTrigger>
					<AccordionContent>
						Basta criar uma conta como vendedor clicando{' '}
						<Link
							href="/sign-up?as=seller"
							className="text-primary text-sm hover:underline hover:underline-offset-4"
						>
							aqui
						</Link>
						. Após o cadastro, você poderá anunciar suas peças com fotos, descrições e
						preços.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Preciso pagar para anunciar meus produtos?</AccordionTrigger>
					<AccordionContent>
						Não. O cadastro e os anúncios são gratuitos. Apenas cobramos uma pequena taxa
						sobre a venda realizada.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3">
					<AccordionTrigger>Como funciona a entrega dos produtos?</AccordionTrigger>
					<AccordionContent>
						O comprador pode escolher entre retirar o produto pessoalmente com o vendedor
						ou optar pelo envio via parceiros logísticos. Essa escolha é feita durante o
						checkout, e o frete é calculado automaticamente quando aplicável.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-4">
					<AccordionTrigger>É seguro comprar pelo SoBrechó?</AccordionTrigger>
					<AccordionContent>
						Sim! Contamos com um sistema de pagamento seguro e retemos o valor até que o
						produto chegue corretamente ao comprador. Prezamos por uma experiência
						confiável para todos.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-5">
					<AccordionTrigger>Qual é a política de reembolso?</AccordionTrigger>
					<AccordionContent>
						Se o produto recebido estiver em desacordo com o anúncio (como defeitos não
						informados ou itens incorretos), o comprador pode solicitar reembolso dentro
						de 7 dias após a entrega. Nossa equipe analisará o caso e garantirá um
						processo justo para ambas as partes.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}
