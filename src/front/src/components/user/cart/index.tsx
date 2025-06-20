'use client';

import { ArrowLeft, Trash2, ShoppingBag, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
	Badge
} from '@/components/ui';
import { AVAILABLE_CATEGORIES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { CartCreators, ProductsCreators } from '@/redux/reducers';

type CartProductType = {
	id: string;
	name: string;
	category: string;
	price: string;
	priceValue: number;
	image: string;
	size: string;
};

export function CartPage() {
	const dispatch = useDispatch();

	const { user } = useTypedSelector((state) => state.auth);
	const userId = user?.id;

	const {
		get: { data: fetchedCart, loading: cartLoading }
	} = useTypedSelector((state) => state.cart);

	const {
		getAll: { data: fetchedProducts, loading: productsLoading }
	} = useTypedSelector((state) => state.products);

	// Estados para controlar o fluxo sequencial
	const [hasDispatchedCart, setHasDispatchedCart] = useState(false);
	const [hasDispatchedProducts, setHasDispatchedProducts] = useState(false);
	const [isProcessingComplete, setIsProcessingComplete] = useState(false);

	// PASSO 1: Dispatch para buscar carrinho quando entrar na página
	useEffect(() => {
		if (userId && !hasDispatchedCart && !cartLoading) {
			dispatch(CartCreators.cartGetRequest({ userId }));
			setHasDispatchedCart(true);
		}
		// Se não tem userId, considera que já "buscou" o carrinho
		if (!userId && !hasDispatchedCart) {
			setHasDispatchedCart(true);
		}
	}, [dispatch, userId, hasDispatchedCart, cartLoading]);

	// PASSO 2: Assim que o carrinho atualizar, dispatch para buscar produtos
	useEffect(() => {
		// Só dispara produtos depois que o carrinho foi buscado (seja vazio ou com itens)
		if (
			hasDispatchedCart &&
			fetchedCart !== null &&
			!hasDispatchedProducts &&
			!productsLoading
		) {
			dispatch(ProductsCreators.productsGetAllRequest());
			setHasDispatchedProducts(true);
		}
	}, [dispatch, hasDispatchedCart, fetchedCart, hasDispatchedProducts, productsLoading]);

	// PASSO 3: Quando tiver ambos os valores, marcar como processamento completo
	useEffect(() => {
		if (
			hasDispatchedCart &&
			hasDispatchedProducts &&
			fetchedCart !== null &&
			fetchedProducts !== null
		) {
			setIsProcessingComplete(true);
		}
	}, [hasDispatchedCart, hasDispatchedProducts, fetchedCart, fetchedProducts]);

	// Dados do carrinho
	const cartItems = useMemo(() => fetchedCart?.items ?? [], [fetchedCart]);
	const hasCartItems = cartItems.length > 0;

	// PASSO 4: Filtrar produtos quando tiver ambos os dados
	const matchedProducts = useMemo(() => {
		if (!isProcessingComplete || !fetchedProducts || cartItems.length === 0) {
			return [];
		}

		return cartItems
			.map((ci) => {
				const p = fetchedProducts.find((p) => p.id === ci.id);
				if (!p) return null;

				const cat = AVAILABLE_CATEGORIES.find((c) => c.value === p.category);

				return {
					id: p.id,
					name: p.name,
					category: cat?.label || p.category,
					price: `R$ ${p.price.toFixed(2).replace('.', ',')}`,
					priceValue: p.price,
					image: p.image,
					size: ci.size
				};
			})
			.filter(Boolean) as CartProductType[];
	}, [isProcessingComplete, fetchedProducts, cartItems]);

	// Cálculos dos totais
	const totals = useMemo(() => {
		const subtotal = matchedProducts.reduce((t, p) => t + p.priceValue, 0);
		const shipping = subtotal >= 250 ? 0 : 15;
		return {
			subtotal,
			shipping,
			total: subtotal + shipping,
			freeShipping: subtotal >= 250,
			amountForFreeShipping: Math.max(0, 250 - subtotal)
		};
	}, [matchedProducts]);

	// Funções de ação
	const handleRemove = (id: string) => {
		if (!userId) return;
		dispatch(CartCreators.cartRemoveItemRequest({ id, userId }));
	};

	const handleClear = () => {
		if (!userId) return;
		dispatch(CartCreators.cartClearRequest({ userId }));
	};

	// Determinar qual mensagem de loading mostrar
	const getLoadingState = () => {
		if (!hasDispatchedCart || cartLoading) {
			return {
				title: 'Carregando carrinho...',
				subtitle: 'Verificando seus itens salvos',
				progress: 25
			};
		}
		if (!hasDispatchedProducts || productsLoading) {
			return {
				title: 'Carregando produtos...',
				subtitle: 'Buscando informações dos produtos',
				progress: 75
			};
		}
		if (!isProcessingComplete) {
			return {
				title: 'Processando...',
				subtitle: 'Finalizando carregamento',
				progress: 90
			};
		}
		return null;
	};

	// MOSTRAR LOADER: Se ainda não completou o processamento
	if (!isProcessingComplete) {
		const loadingState = getLoadingState();

		return (
			<div className="container mx-auto px-4 py-8">
				<div className="flex min-h-[400px] flex-col items-center justify-center text-center">
					<Loader2Icon className="text-muted-foreground mb-4 size-8 animate-spin" />
					<h3 className="mb-2 text-lg font-medium">{loadingState?.title}</h3>
					<p className="text-muted-foreground mb-4 text-sm">{loadingState?.subtitle}</p>

					{/* Barra de progresso */}
					<div className="w-64">
						<div className="text-muted-foreground mb-2 flex justify-between text-xs">
							<span>Carregando dados...</span>
							<span>{loadingState?.progress}%</span>
						</div>
						<div className="bg-muted h-2 overflow-hidden rounded-full">
							<div
								className="bg-primary h-full transition-all duration-500 ease-out"
								style={{ width: `${loadingState?.progress}%` }}
							/>
						</div>
					</div>

					{/* Status dos passos */}
					<div className="mt-6 space-y-2 text-sm">
						<div
							className={`flex items-center gap-2 ${hasDispatchedCart && fetchedCart !== null ? 'text-green-600' : 'text-muted-foreground'}`}
						>
							<span>{hasDispatchedCart && fetchedCart !== null ? '✓' : '○'}</span>
							<span>Carrinho carregado</span>
						</div>
						<div
							className={`flex items-center gap-2 ${hasDispatchedProducts && fetchedProducts !== null ? 'text-green-600' : 'text-muted-foreground'}`}
						>
							<span>{hasDispatchedProducts && fetchedProducts !== null ? '✓' : '○'}</span>
							<span>Produtos carregados</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// MOSTRAR "CARRINHO VAZIO": Só depois de tudo processado
	// Condições: não tem itens no carrinho OU não tem produtos OU não tem matches
	if (
		!hasCartItems ||
		!fetchedProducts ||
		fetchedProducts.length === 0 ||
		matchedProducts.length === 0
	) {
		let emptyMessage = {
			title: 'Seu carrinho está vazio',
			subtitle:
				'Adicione alguns produtos incríveis ao seu carrinho para começar suas compras.'
		};

		// Personalizar mensagem baseado no motivo
		if (hasCartItems && (!fetchedProducts || fetchedProducts.length === 0)) {
			emptyMessage = {
				title: 'Produtos indisponíveis',
				subtitle: 'Não foi possível carregar os produtos. Tente novamente mais tarde.'
			};
		} else if (
			hasCartItems &&
			fetchedProducts &&
			fetchedProducts.length > 0 &&
			matchedProducts.length === 0
		) {
			emptyMessage = {
				title: 'Produtos não encontrados',
				subtitle: 'Os produtos do seu carrinho não estão mais disponíveis.'
			};
		}

		return (
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-md text-center">
					<div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
						<ShoppingBag className="text-primary h-12 w-12" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">{emptyMessage.title}</h2>
					<p className="text-muted-foreground mb-6">{emptyMessage.subtitle}</p>

					<div className="flex flex-col gap-3">
						<Button asChild size="lg">
							<Link href="/">Continuar Comprando</Link>
						</Button>

						{/* Se tem itens no carrinho mas não tem matches, oferecer limpar */}
						{hasCartItems && matchedProducts.length === 0 && (
							<Button variant="outline" onClick={handleClear}>
								Limpar Carrinho
							</Button>
						)}
					</div>
				</div>
			</div>
		);
	}

	// MOSTRAR CARRINHO: Só chega aqui se tem tudo certinho
	return (
		<div className="from-background to-muted/20 min-h-screen bg-gradient-to-br">
			<div className="container mx-auto max-w-7xl px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<Link
						href="/"
						className="text-muted-foreground hover:text-foreground group mb-4 inline-flex items-center text-sm transition-colors"
					>
						<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
						Continuar comprando
					</Link>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold tracking-tight">Carrinho de Compras</h1>
							<p className="text-muted-foreground mt-2">
								{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} selecionado
								{cartItems.length !== 1 ? 's' : ''}
							</p>
						</div>
						<div className="hidden items-center gap-2 md:flex">
							<Badge variant="secondary" className="text-sm">
								{matchedProducts.length} produto{matchedProducts.length !== 1 ? 's' : ''}{' '}
								encontrado
								{matchedProducts.length !== 1 ? 's' : ''}
							</Badge>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
					{/* Products List */}
					<div className="space-y-4 xl:col-span-8">
						{matchedProducts.map((product) => (
							<Card
								key={`${product.id}-${product.size}`}
								className="group border-0 py-0 shadow-sm transition-all duration-300 hover:shadow-lg"
							>
								<CardContent className="p-6">
									<div className="flex gap-6">
										{/* Product Image */}
										<div className="relative flex-shrink-0">
											<div className="bg-muted relative h-32 w-32 overflow-hidden rounded-xl">
												<Image
													src={product.image || '/placeholder.svg'}
													alt={product.name}
													fill
													className="object-cover"
												/>
											</div>
										</div>

										{/* Product Details */}
										<div className="min-w-0 flex-1 space-y-4">
											<div className="items-between flex flex-col justify-between space-y-2">
												<div className="flex w-full items-center justify-between">
													<h3 className="mb-1 text-lg leading-tight font-semibold">
														{product.name}
													</h3>
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleRemove(product.id)}
														className="text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
												<div className="flex items-center justify-start space-x-2">
													<Badge variant="secondary" className="text-sm">
														{product.category}
													</Badge>
													<Badge variant="outline" className="text-sm">
														Tamanho: {product.size}
													</Badge>
												</div>
											</div>

											{/* Price */}
											<div className="flex items-center justify-end">
												<div className="text-right">
													<p className="text-xl font-bold">{product.price}</p>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}

						{/* Clear Cart Button */}
						<div className="flex items-center justify-between pt-4">
							<Button
								variant="outline"
								className="text-muted-foreground cursor-pointer"
								onClick={handleClear}
							>
								Limpar carrinho
							</Button>
							<Button variant="ghost" asChild>
								<Link href="/">Adicionar mais produtos</Link>
							</Button>
						</div>
					</div>

					{/* Order Summary */}
					<div className="xl:col-span-4">
						<div className="sticky top-8">
							<Card className="border-0 shadow-lg">
								<CardHeader className="pb-4">
									<CardTitle className="text-xl">Resumo do Pedido</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									{/* Items Summary */}
									<div className="space-y-3">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">
												Subtotal ({cartItems.length}{' '}
												{cartItems.length === 1 ? 'item' : 'itens'})
											</span>
											<span className="font-mono font-medium">
												R$ {totals.subtotal.toFixed(2).replace('.', ',')}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">Frete</span>
											<span
												className={`font-mono ${totals.freeShipping ? 'text-green-600' : 'font-mono'}`}
											>
												{totals.freeShipping
													? 'Grátis'
													: `R$ ${totals.shipping.toFixed(2).replace('.', ',')}`}
											</span>
										</div>
									</div>

									<Separator />

									{/* Free Shipping Progress */}
									{!totals.freeShipping && (
										<div className="bg-muted/50 rounded-lg border p-4">
											<div className="mb-2 flex items-center justify-between">
												<span className="text-sm font-medium">Frete Grátis</span>
												<span className="text-xs">
													{Math.round((totals.subtotal / 250) * 100)}%
												</span>
											</div>
											<div className="bg-primary/20 mb-2 h-2 w-full rounded-full">
												<div
													className="bg-primary h-2 rounded-full transition-all duration-300"
													style={{
														width: `${Math.min((totals.subtotal / 250) * 100, 100)}%`
													}}
												/>
											</div>
											<p className="text-muted-foreground text-xs">
												Adicione mais{' '}
												<strong>
													R$ {totals.amountForFreeShipping.toFixed(2).replace('.', ',')}
												</strong>{' '}
												para frete grátis!
											</p>
										</div>
									)}

									{totals.freeShipping && (
										<div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
											<div className="flex items-center gap-2">
												<div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
												<span className="text-sm font-medium text-green-700 dark:text-green-300">
													🎉 Você ganhou frete grátis!
												</span>
											</div>
										</div>
									)}

									{/* Total */}
									<div className="bg-muted/50 rounded-lg p-4">
										<div className="flex items-center justify-between">
											<span className="text-lg font-semibold">Total</span>
											<span className="text-2xl font-bold">
												R$ {totals.total.toFixed(2).replace('.', ',')}
											</span>
										</div>
									</div>

									{/* Checkout Button */}
									<Button
										className="h-12 w-full cursor-pointer font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
										asChild
									>
										<Link href="/checkout">Finalizar Compra</Link>
									</Button>

									{/* Security Info */}
									<div className="pt-2 text-center">
										<p className="text-muted-foreground text-xs">
											🔒 Compra 100% segura e protegida
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
