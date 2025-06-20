/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	MapPinIcon,
	Check,
	ChevronsUpDown,
	CreditCardIcon,
	CreditCard,
	QrCode,
	PackageIcon,
	Loader2Icon,
	ShoppingBag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { mask, unmask } from 'remask';
import { z } from 'zod';

import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator
} from '@/components/ui';
import { AVAILABLE_CATEGORIES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { CheckoutCreators, CartCreators, ProductsCreators } from '@/redux/reducers';

type CartProductType = {
	id: string;
	name: string;
	category: string;
	price: string;
	priceValue: number;
	image: string;
	size: string;
};

const brazilianStates = [
	{ value: 'AC', label: 'Acre' },
	{ value: 'AL', label: 'Alagoas' },
	{ value: 'AP', label: 'Amapá' },
	{ value: 'AM', label: 'Amazonas' },
	{ value: 'BA', label: 'Bahia' },
	{ value: 'CE', label: 'Ceará' },
	{ value: 'DF', label: 'Distrito Federal' },
	{ value: 'ES', label: 'Espírito Santo' },
	{ value: 'GO', label: 'Goiás' },
	{ value: 'MA', label: 'Maranhão' },
	{ value: 'MT', label: 'Mato Grosso' },
	{ value: 'MS', label: 'Mato Grosso do Sul' },
	{ value: 'MG', label: 'Minas Gerais' },
	{ value: 'PA', label: 'Pará' },
	{ value: 'PB', label: 'Paraíba' },
	{ value: 'PR', label: 'Paraná' },
	{ value: 'PE', label: 'Pernambuco' },
	{ value: 'PI', label: 'Piauí' },
	{ value: 'RJ', label: 'Rio de Janeiro' },
	{ value: 'RN', label: 'Rio Grande do Norte' },
	{ value: 'RS', label: 'Rio Grande do Sul' },
	{ value: 'RO', label: 'Rondônia' },
	{ value: 'RR', label: 'Roraima' },
	{ value: 'SC', label: 'Santa Catarina' },
	{ value: 'SP', label: 'São Paulo' },
	{ value: 'SE', label: 'Sergipe' },
	{ value: 'TO', label: 'Tocantins' }
];

const creditCardPaymentSchema = z.object({
	method: z.literal('credit_card'),
	card: z.object({
		number: z.string().min(16, 'Número inválido'),
		holder: z.string(),
		expiration: z.string().min(4, 'Data inválida'),
		cvv: z.string().min(3).max(4),
		cpf: z.string().min(11).max(14)
	}),
	installments: z.number().min(1).max(12)
});

const pixPaymentSchema = z.object({
	method: z.literal('pix')
});

const checkoutFormSchema = z.object({
	address: z.object({
		cep: z.string(),
		street: z.string(),
		number: z.string(),
		complement: z.string().optional(),
		district: z.string(),
		city: z.string(),
		state: z.string()
	}),
	payment: z.discriminatedUnion('method', [creditCardPaymentSchema, pixPaymentSchema])
});

type CheckoutFormType = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm() {
	const [stateOpen, setStateOpen] = useState(false);

	const form = useForm<CheckoutFormType>({
		resolver: zodResolver(checkoutFormSchema),
		mode: 'onChange',
		defaultValues: {
			address: {
				cep: '',
				street: '',
				number: '',
				complement: '',
				district: '',
				city: '',
				state: ''
			},
			payment: {
				method: 'credit_card',
				card: {
					number: '',
					holder: '',
					expiration: '',
					cvv: '',
					cpf: ''
				},
				installments: 1
			}
		}
	});

	const dispatch = useDispatch();

	const { user } = useTypedSelector((state) => state.auth);
	const userId = user?.id;

	const {
		getAddress: { data: fetchedAddress, loading: addressLoading }
	} = useTypedSelector((state) => state.checkout);

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
	const [matchedProducts, setMatchedProducts] = useState<CartProductType[]>([]);

	const cepValue = form.watch('address.cep');

	// FLUXO SEQUENCIAL - PASSO 1: Dispatch para buscar carrinho
	useEffect(() => {
		if (userId && !hasDispatchedCart && !cartLoading) {
			dispatch(CartCreators.cartGetRequest({ userId }));
			setHasDispatchedCart(true);
		}
		if (!userId && !hasDispatchedCart) {
			setHasDispatchedCart(true);
		}
	}, [dispatch, userId, hasDispatchedCart, cartLoading]);

	// FLUXO SEQUENCIAL - PASSO 2: Dispatch para buscar produtos
	useEffect(() => {
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

	// FLUXO SEQUENCIAL - PASSO 3: Marcar processamento como completo
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
	useEffect(() => {
		if (!isProcessingComplete || !fetchedProducts || cartItems.length === 0) {
			setMatchedProducts([]);
			return;
		}

		const newMatchedProducts = cartItems
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

		setMatchedProducts(newMatchedProducts);
	}, [isProcessingComplete, fetchedProducts, cartItems]);

	// Cálculos dos totais
	const totals = useMemo(() => {
		const subtotal = matchedProducts.reduce((t, p) => t + p.priceValue, 0);
		const shipping = subtotal >= 250 ? 0 : 15;
		return {
			subtotal,
			shipping,
			total: subtotal + shipping,
			freeShipping: subtotal >= 250
		};
	}, [matchedProducts]);

	// Opções de parcelamento baseadas no total real
	const installmentOptions = useMemo(() => {
		if (totals.total === 0) return [];

		const maxInstallments = Math.min(12, Math.floor(totals.total / 20));
		const options = [];

		for (let i = 1; i <= maxInstallments; i++) {
			const installmentValue = totals.total / i;
			const label =
				i === 1
					? `À vista - R$ ${totals.total.toFixed(2).replace('.', ',')}`
					: `${i}x de R$ ${installmentValue.toFixed(2).replace('.', ',')} ${i > 6 ? 'com juros' : 'sem juros'}`;

			options.push({ value: i, label });
		}

		return options;
	}, [totals.total]);

	// Busca de CEP
	useEffect(() => {
		const cleanCep = unmask(cepValue);
		if (cleanCep.length === 8) {
			dispatch(CheckoutCreators.checkoutGetAddressRequest({ cep: cleanCep }));
		}
	}, [cepValue, dispatch]);

	// Preencher endereço automaticamente
	useEffect(() => {
		if (fetchedAddress) {
			form.setValue('address.street', fetchedAddress.street);
			form.setValue('address.district', fetchedAddress.district);
			form.setValue('address.city', fetchedAddress.city);
			form.setValue('address.state', fetchedAddress.state);
		}
	}, [fetchedAddress, form]);

	function onSubmit(data: CheckoutFormType) {
		const payload = {
			address: {
				cep: data.address.cep,
				street: data.address.street,
				number: data.address.number,
				complement: data.address.complement || '',
				district: data.address.district,
				city: data.address.city,
				state: data.address.state
			},
			payment: {
				method: data.payment.method,
				totalValue: totals.total,
				...(data.payment.method === 'credit_card' && {
					card: {
						number: data.payment.card.number,
						holder: data.payment.card.holder,
						expiration: data.payment.card.expiration,
						cvv: data.payment.card.cvv,
						cpf: data.payment.card.cpf
					},
					installments: data.payment.installments
				})
			},
			items: matchedProducts.map((product) => ({
				id: product.id,
				size: product.size
			}))
		};

		console.log('Payload final:', payload);
	}

	// Determinar estado de loading
	const getLoadingState = () => {
		if (!hasDispatchedCart || cartLoading) {
			return {
				title: 'Carregando carrinho...',
				subtitle: 'Verificando seus itens',
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
				title: 'Preparando checkout...',
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

					<div className="w-64">
						<div className="text-muted-foreground mb-2 flex justify-between text-xs">
							<span>Preparando checkout...</span>
							<span>{loadingState?.progress}%</span>
						</div>
						<div className="bg-muted h-2 overflow-hidden rounded-full">
							<div
								className="bg-primary h-full transition-all duration-500 ease-out"
								style={{ width: `${loadingState?.progress}%` }}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// REDIRECIONAR PARA CARRINHO: Se não tem itens ou produtos
	if (
		!hasCartItems ||
		!fetchedProducts ||
		fetchedProducts.length === 0 ||
		matchedProducts.length === 0
	) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-md text-center">
					<div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
						<ShoppingBag className="text-primary h-12 w-12" />
					</div>
					<h2 className="mb-2 text-2xl font-bold">Carrinho vazio</h2>
					<p className="text-muted-foreground mb-6">
						Você precisa ter itens no carrinho para finalizar a compra.
					</p>
					<Button asChild size="lg">
						<Link href="/cart">Voltar ao Carrinho</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-6 lg:col-span-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MapPinIcon className="size-4" />
							Endereço de entrega
						</CardTitle>
						<CardDescription>
							Informe o endereço onde deseja receber seu pedido
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<FormField
										control={form.control}
										name="address.cep"
										render={({ field }) => (
											<FormItem className="md:col-span-1">
												<FormLabel required>CEP</FormLabel>
												<FormControl>
													<div className="relative">
														<Input
															{...field}
															placeholder="00000-000"
															type="text"
															value={mask(field.value, ['99999-999'])}
															onChange={(e) => field.onChange(unmask(e.target.value))}
														/>
														{addressLoading && (
															<div className="absolute top-1/2 right-3 -translate-y-1/2">
																<Loader2Icon className="text-muted-foreground h-4 w-4 animate-spin" />
															</div>
														)}
													</div>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address.street"
										render={({ field }) => (
											<FormItem className="md:col-span-2">
												<FormLabel required>Rua</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={addressLoading}
														placeholder="Rua, Avenida..."
														type="text"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<FormField
										control={form.control}
										name="address.complement"
										render={({ field }) => (
											<FormItem className="md:col-span-2">
												<FormLabel>Complemento</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={addressLoading}
														placeholder="Apto, Bloco..."
														type="text"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address.number"
										render={({ field }) => (
											<FormItem className="md:col-span-1">
												<FormLabel required>Número</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={addressLoading}
														placeholder="123"
														type="text"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<FormField
										control={form.control}
										name="address.district"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bairro</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={addressLoading}
														placeholder="Nome do Bairro"
														type="text"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address.city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Cidade</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={addressLoading}
														placeholder="Nome da Cidade"
														type="text"
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-1">
									<FormField
										control={form.control}
										name="address.state"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel required>Estado</FormLabel>
												<Popover open={stateOpen} onOpenChange={setStateOpen}>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant="outline"
																role="combobox"
																disabled={addressLoading}
																className={cn(
																	'w-full justify-between',
																	!field.value && 'text-muted-foreground'
																)}
															>
																{field.value
																	? brazilianStates.find(
																			(state) => state.value === field.value
																		)?.label
																	: 'Selecione um estado'}
																<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-full p-0">
														<Command>
															<CommandInput placeholder="Pesquisar estado..." />
															<CommandList>
																<CommandEmpty>Nenhum estado encontrado.</CommandEmpty>
																<CommandGroup>
																	{brazilianStates.map((state) => (
																		<CommandItem
																			value={state.label}
																			key={state.value}
																			onSelect={() => {
																				form.setValue('address.state', state.value);
																				setStateOpen(false);
																			}}
																		>
																			<Check
																				className={cn(
																					'mr-2 h-4 w-4',
																					state.value === field.value
																						? 'opacity-100'
																						: 'opacity-0'
																				)}
																			/>
																			{state.label}
																		</CommandItem>
																	))}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
											</FormItem>
										)}
									/>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCardIcon className="size-4" />
							Forma de pagamento
						</CardTitle>
						<CardDescription>Escolha como deseja pagar seu pedido</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<div className="flex flex-col space-y-4">
									<FormField
										control={form.control}
										name="payment.method"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="space-y-3">
														<div
															className={cn(
																'flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-colors',
																'hover:bg-foreground/5',
																field.value === 'credit_card'
																	? 'border-primary bg-primary/5 ring-primary ring-1'
																	: 'border-border'
															)}
															onClick={() => {
																field.onChange('credit_card');
																form.setValue('payment', {
																	method: 'credit_card',
																	card: {
																		number: '',
																		holder: '',
																		expiration: '',
																		cvv: '',
																		cpf: ''
																	},
																	installments: 1
																});
															}}
														>
															<div
																className={cn(
																	'flex h-4 w-4 items-center justify-center rounded-full border-2',
																	field.value === 'credit_card'
																		? 'border-primary bg-primary'
																		: 'border-muted-foreground'
																)}
															>
																{field.value === 'credit_card' && (
																	<div className="h-2 w-2 rounded-full bg-white" />
																)}
															</div>
															<div className="flex flex-1 cursor-pointer items-center gap-2">
																<CreditCard className="h-4 w-4" />
																<span className="font-medium">Cartão de Crédito</span>
															</div>
															<div className="flex gap-1">
																<Badge variant="outline">Visa</Badge>
																<Badge variant="outline">Master</Badge>
																<Badge variant="outline">Elo</Badge>
															</div>
														</div>

														<div
															className={cn(
																'flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-colors',
																'hover:bg-foreground/5',
																field.value === 'pix'
																	? 'border-primary bg-primary/5 ring-primary ring-1'
																	: 'border-border'
															)}
															onClick={() => {
																field.onChange('pix');
																form.setValue('payment', { method: 'pix' });
															}}
														>
															<div
																className={cn(
																	'flex h-4 w-4 items-center justify-center rounded-full border-2',
																	field.value === 'pix'
																		? 'border-primary bg-primary'
																		: 'border-muted-foreground'
																)}
															>
																{field.value === 'pix' && (
																	<div className="h-2 w-2 rounded-full bg-white" />
																)}
															</div>
															<div className="flex flex-1 cursor-pointer items-center gap-2">
																<QrCode className="h-4 w-4" />
																<span className="font-medium">PIX</span>
															</div>
															<Badge variant="secondary">Aprovação instantânea</Badge>
														</div>
													</div>
												</FormControl>
											</FormItem>
										)}
									/>

									{form.watch('payment.method') === 'credit_card' && (
										<div className="space-y-4 pt-4">
											<FormField
												control={form.control}
												name="payment.card.holder"
												render={({ field }) => (
													<FormItem>
														<FormLabel required>Nome do titular</FormLabel>
														<FormControl>
															<Input
																{...field}
																type="text"
																placeholder="Nome como aparece no cartão"
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="payment.card.number"
												render={({ field }) => (
													<FormItem>
														<FormLabel required>Número do cartão</FormLabel>
														<FormControl>
															<Input
																{...field}
																type="text"
																placeholder="0000 0000 0000 0000"
																value={mask(field.value || '', ['9999 9999 9999 9999'])}
																onChange={(e) => field.onChange(unmask(e.target.value))}
															/>
														</FormControl>
													</FormItem>
												)}
											/>
											<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
												<FormField
													control={form.control}
													name="payment.card.expiration"
													render={({ field }) => (
														<FormItem>
															<FormLabel required>Validade</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	type="text"
																	placeholder="MM/AA"
																	value={mask(field.value || '', ['99/99'])}
																	onChange={(e) => field.onChange(unmask(e.target.value))}
																/>
															</FormControl>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="payment.card.cvv"
													render={({ field }) => (
														<FormItem>
															<FormLabel required>CVV</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	type="text"
																	placeholder="123"
																	value={mask(field.value || '', ['999'])}
																	onChange={(e) => field.onChange(unmask(e.target.value))}
																/>
															</FormControl>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="payment.card.cpf"
													render={({ field }) => (
														<FormItem>
															<FormLabel required>CPF</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	type="text"
																	placeholder="000.000.000-00"
																	value={mask(field.value || '', ['999.999.999-99'])}
																	onChange={(e) => field.onChange(unmask(e.target.value))}
																/>
															</FormControl>
														</FormItem>
													)}
												/>
											</div>
											<FormField
												control={form.control}
												name="payment.installments"
												render={({ field }) => (
													<FormItem>
														<FormLabel required>Parcelamento</FormLabel>
														<FormControl>
															<Select
																value={String(field.value)}
																onValueChange={(value) => field.onChange(Number(value))}
															>
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Selecione" />
																</SelectTrigger>
																<SelectContent>
																	{installmentOptions.map((option) => (
																		<SelectItem
																			key={option.value}
																			value={option.value.toString()}
																		>
																			{option.label}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</FormControl>
													</FormItem>
												)}
											/>
										</div>
									)}

									{form.watch('payment.method') === 'pix' && (
										<div className="bg-primary/5 border-primary rounded-lg border p-4">
											<div className="mb-2 flex items-center gap-2">
												<QrCode className="h-4 w-4" />
												<span className="font-medium">Pagamento via PIX</span>
											</div>
											<p className="text-muted-foreground mb-4 text-sm">
												Após confirmar o pedido, você receberá o código PIX para
												pagamento. O pagamento é processado instantaneamente.
											</p>
										</div>
									)}
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
			<div className="lg:col-span-1">
				<Card className="sticky top-20">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<PackageIcon className="size-4" />
							Resumo do Pedido
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Lista de Produtos */}
						<div className="space-y-3">
							{matchedProducts.map((product) => (
								<div key={`${product.id}-${product.size}`} className="flex gap-3">
									<div className="relative h-12 w-12 flex-shrink-0">
										<Image
											src={product.image || '/placeholder.svg?height=48&width=48'}
											alt={product.name}
											fill
											className="rounded object-cover"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">{product.name}</p>
										<p className="text-muted-foreground text-xs">
											{product.size} • {product.category}
										</p>
										<p className="text-sm font-bold">{product.price}</p>
									</div>
								</div>
							))}
						</div>

						<Separator />

						{/* Totais */}
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>
									Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
									)
								</span>
								<span className="font-mono">
									R$ {totals.subtotal.toFixed(2).replace('.', ',')}
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Frete</span>
								<span className={totals.freeShipping ? 'text-green-600' : 'font-mono'}>
									{totals.freeShipping
										? 'Grátis'
										: `R$ ${totals.shipping.toFixed(2).replace('.', ',')}`}
								</span>
							</div>
							<Separator />
							<div className="flex justify-between text-lg font-semibold">
								<span>Total</span>
								<span>R$ {totals.total.toFixed(2).replace('.', ',')}</span>
							</div>
						</div>

						{/* Frete Grátis Progress */}
						{!totals.freeShipping && (
							<div className="bg-muted/50 rounded-lg border p-3">
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
										R$ {(250 - totals.subtotal).toFixed(2).replace('.', ',')}
									</strong>{' '}
									para frete grátis!
								</p>
							</div>
						)}

						{totals.freeShipping && (
							<div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/20">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
									<span className="text-sm font-medium text-green-700 dark:text-green-300">
										🎉 Você ganhou frete grátis!
									</span>
								</div>
							</div>
						)}

						<Separator />

						<div className="space-y-3">
							<Button
								className="w-full cursor-pointer"
								size="lg"
								onClick={form.handleSubmit(onSubmit)}
								disabled={!form.formState.isValid}
							>
								Finalizar Compra
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
