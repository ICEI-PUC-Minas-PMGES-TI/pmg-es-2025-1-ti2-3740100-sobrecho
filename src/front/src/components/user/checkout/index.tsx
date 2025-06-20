import { CheckoutForm } from '@/components/user/checkout/form';

export function CheckoutPage() {
	return (
		<div className="min-h-screen py-8">
			<div className="container mx-auto max-w-6xl px-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold">Finalizar Compra</h1>
					<p className="text-muted-foreground mt-2">
						Complete seus dados para finalizar o pedido
					</p>
				</div>
				<div className="grid gap-8 lg:grid-cols-3">
					<CheckoutForm />
				</div>
			</div>
		</div>
	);
}
