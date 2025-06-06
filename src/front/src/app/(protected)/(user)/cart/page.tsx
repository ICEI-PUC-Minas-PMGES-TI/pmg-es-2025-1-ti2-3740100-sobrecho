'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { useTypedSelector } from '@/hooks';
import { useCart } from '@/hooks/use-cart';
import type { CartProduct } from '@/types/cart';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

// Constante de categorias para normalização
const AVAILABLE_CATEGORIES = [
	{ value: 'roupas-femininas', label: 'Roupas Femininas' },
	{ value: 'roupas-masculinas', label: 'Roupas Masculinas' },
	{ value: 'acessorios', label: 'Acessórios' },
	{ value: 'calcados', label: 'Calçados' },
	{ value: 'bolsas', label: 'Bolsas' },
	{ value: 'joias', label: 'Joias' },
	{ value: 'decoracao', label: 'Decoração' },
	{ value: 'livros', label: 'Livros' }
];

// Você pode passar o userId como prop quando tiver a lógica de autenticação
export default function CartPage() {
	const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
	const {
		listAllProducts: { data: allProducts }
	} = useTypedSelector((state) => state.products);

	// Buscar produtos do carrinho e normalizar dados
	const cartProducts: CartProduct[] = useMemo(() => {
		if (!allProducts || items.length === 0) return [];

		return items
			.map((cartItem) => {
				const product = allProducts.find((p) => p.id === cartItem.productId);
				if (!product) return null;

				const priceValue =
					Number.parseFloat(
						product.price
							.replace(/\./g, '')
							.replace(',', '.')
							.replace(/[^\d.]/g, '')
					) || 0;

				const categoryData = AVAILABLE_CATEGORIES.find(
					(c) => c.value === product.category
				);
				const categoryLabel = categoryData?.label || product.category;

				return {
					id: product.id,
					name: product.name,
					category: categoryLabel,
					price: `R$ ${priceValue.toFixed(2).replace('.', ',')}`,
					priceValue,
					images: product.images,
					size: cartItem.size,
					quantity: cartItem.quantity
				};
			})
			.filter(Boolean) as CartProduct[];
	}, [items, allProducts]);

	// Calcular totais
	const totals = useMemo(() => {
		const subtotal = cartProducts.reduce((total, product) => {
			return total + product.priceValue * product.quantity;
		}, 0);

		const freeShippingThreshold = 250;
		const shippingCost = subtotal >= freeShippingThreshold ? 0 : 15;
		const total = subtotal + shippingCost;

		return {
			subtotal,
			shipping: shippingCost,
			total,
			freeShipping: subtotal >= freeShippingThreshold,
			amountForFreeShipping: Math.max(0, freeShippingThreshold - subtotal)
		};
	}, [cartProducts]);

	if (items.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col items-center justify-center py-12">
					<ShoppingBag className="mb-4 h-24 w-24 text-muted-foreground" />
					<h2 className="mb-2 text-2xl font-bold">Seu carrinho está vazio</h2>
					<p className="mb-6 text-muted-foreground">
						Adicione alguns produtos para começar suas compras
					</p>
					<Link href="/">
						<Button>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Continuar comprando
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<Link
					href="/"
					className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Continuar comprando
				</Link>
				<h1 className="mt-2 text-3xl font-bold">Carrinho de Compras</h1>
				<p className="text-muted-foreground">
					{totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
				</p>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Lista de produtos */}
				<div className="space-y-4 lg:col-span-2">
					{cartProducts.map((product) => (
						<Card key={`${product.id}-${product.size}`}>
							<CardContent className="p-4">
								<div className="flex gap-4">
									<div className="relative h-20 w-20 flex-shrink-0">
										<Image
											src={product.images[0] || '/placeholder.svg?height=80&width=80'}
											alt={product.name}
											fill
											className="rounded object-cover"
										/>
									</div>

									<div className="min-w-0 flex-1">
										<h3 className="truncate font-medium">{product.name}</h3>
										<p className="text-sm text-muted-foreground">{product.category}</p>
										<p className="text-sm text-muted-foreground">
											Tamanho: {product.size}
										</p>
										<p className="mt-1 font-bold">{product.price}</p>
									</div>

									<div className="flex flex-col items-end gap-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeItem(product.id, product.size)}
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="h-4 w-4" />
										</Button>

										<div className="flex items-center gap-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(product.id, product.size, product.quantity - 1)
												}
												disabled={product.quantity <= 1}
											>
												<Minus className="h-3 w-3" />
											</Button>
											<span className="w-8 text-center text-sm">{product.quantity}</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(product.id, product.size, product.quantity + 1)
												}
											>
												<Plus className="h-3 w-3" />
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}

					<div className="flex justify-end">
						<Button variant="outline" onClick={clearCart}>
							Limpar carrinho
						</Button>
					</div>
				</div>

				{/* Resumo do pedido */}
				<div className="lg:col-span-1">
					<Card className="sticky top-4">
						<CardHeader>
							<CardTitle>Resumo do Pedido</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>R$ {totals.subtotal.toFixed(2).replace('.', ',')}</span>
							</div>

							<div className="flex justify-between">
								<span>Frete</span>
								<span className={totals.freeShipping ? 'text-green-600' : ''}>
									{totals.freeShipping
										? 'Grátis'
										: `R$ ${totals.shipping.toFixed(2).replace('.', ',')}`}
								</span>
							</div>

							{!totals.freeShipping && totals.amountForFreeShipping > 0 && (
								<div className="rounded bg-muted p-3 text-sm text-muted-foreground">
									Adicione mais R${' '}
									{totals.amountForFreeShipping.toFixed(2).replace('.', ',')} para ganhar
									frete grátis!
								</div>
							)}

							{totals.freeShipping && (
								<div className="rounded bg-green-50 p-3 text-sm text-green-600">
									🎉 Você ganhou frete grátis!
								</div>
							)}

							<Separator />

							<div className="flex justify-between text-lg font-bold">
								<span>Total</span>
								<span>R$ {totals.total.toFixed(2).replace('.', ',')}</span>
							</div>

							<Button className="w-full" size="lg">
								Finalizar Compra
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
