'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Package,
	Tag,
	TrendingUp,
	Users,
	Info,
	Lightbulb,
	CheckCircle,
	Edit
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AVAILABLE_CATEGORIES, AVAILABLE_SIZES } from '@/config/products';
import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import { editProductFormSchema } from '@/schemas/dashboard/seller/products/forms';

import type { EditProductFormType } from '@/types/dashboard/seller/products/forms';
import type React from 'react';

export function EditProductForm() {
	const params = useParams();
	const id = params?.id as string;

	const {
		getById: { data: product },
		update: { loading, success }
	} = useTypedSelector((state) => state.products);

	const form = useForm<EditProductFormType>({
		resolver: zodResolver(editProductFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			price: undefined,
			category: '',
			size: ''
		}
	});

	const dispatch = useDispatch();
	const router = useRouter();

	const { user } = useTypedSelector((state) => state.auth);

	// Inicializar sempre com string vazia para evitar undefined
	const [priceInput, setPriceInput] = useState<string>('');

	useEffect(() => {
		dispatch(ProductsCreators.productsGetByIdRequest({ id }));
	}, [id, dispatch]);

	useEffect(() => {
		if (product) {
			const priceString = product.price ? product.price.toString().replace('.', ',') : '';

			form.reset({
				name: product.name || '',
				description: product.description || '',
				price: product.price ?? undefined,
				category: product.category || '',
				size: product.size || ''
			});

			setPriceInput(priceString);
		}
	}, [product, form]);

	function onSubmit(data: EditProductFormType) {
		if (user?.role !== 'ROLE_SELLER') return;

		const payload = {
			...data,
			id: product.id
		};

		dispatch(ProductsCreators.productsUpdateRequest(payload));
	}

	useEffect(() => {
		if (success) {
			router.push('/dashboard/products');
		}
	}, [router, success]);

	// Watch form values for preview
	const watchedValues = form.watch();

	// Calculate form completion (sem imagem)
	const formFields = ['name', 'description', 'price', 'category', 'size'];
	const completedFields = formFields.filter((field) => {
		const value = watchedValues[field as keyof typeof watchedValues];
		return value !== undefined && value !== '' && value !== null;
	}).length;
	const completionPercentage = (completedFields / formFields.length) * 100;

	// Função para formatar o preço
	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;

		// Atualiza o texto visível (permite vírgula)
		setPriceInput(raw);

		// Normaliza para ponto e converte para número
		const normalized = raw.replace(',', '.');

		// Só envia para o form se for um número válido
		const parsed = Number.parseFloat(normalized);
		if (!isNaN(parsed) && parsed > 0) {
			form.setValue('price', parsed, { shouldValidate: true });
		} else {
			// Use 0 em vez de undefined para evitar erro TypeScript
			form.setValue('price', 0, { shouldValidate: true });
		}
	};

	// Verificar se o produto existe antes de renderizar
	if (!product) {
		return (
			<div className="bg-background flex min-h-screen items-center justify-center">
				<div className="text-center">
					<p className="text-lg">Carregando produto...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-background min-h-screen">
			<div className="container mx-auto h-full px-4 py-8">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
							{/* Sidebar Esquerda - Dicas e Progresso */}
							<div className="space-y-6 xl:col-span-1">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg">
											<TrendingUp className="h-5 w-5" />
											Progresso
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span>Completude</span>
												<span>{Math.round(completionPercentage)}%</span>
											</div>
											<Progress value={completionPercentage} className="h-2" />
										</div>
										<div className="space-y-2">
											{formFields.map((field) => {
												const isCompleted =
													watchedValues[field as keyof typeof watchedValues];
												return (
													<div key={field} className="flex items-center gap-2 text-sm">
														<CheckCircle
															className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-muted-foreground'}`}
														/>
														<span
															className={
																isCompleted ? 'text-foreground' : 'text-muted-foreground'
															}
														>
															{field === 'name' && 'Nome'}
															{field === 'description' && 'Descrição'}
															{field === 'price' && 'Preço'}
															{field === 'category' && 'Categoria'}
															{field === 'size' && 'Tamanho'}
														</span>
													</div>
												);
											})}
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-lg">
											<Lightbulb className="h-5 w-5" />
											Dicas de Edição
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<Alert>
											<Edit className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Alterações importantes:</strong> Revise cuidadosamente as
												informações antes de salvar. As mudanças serão aplicadas
												imediatamente.
											</AlertDescription>
										</Alert>

										<Alert>
											<Users className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Descrição atualizada:</strong> Mantenha as informações
												sempre atualizadas para melhorar a experiência dos compradores.
											</AlertDescription>
										</Alert>

										<Alert>
											<Tag className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Preço dinâmico:</strong> Ajuste o preço conforme a demanda
												e concorrência do mercado.
											</AlertDescription>
										</Alert>

										<Alert>
											<Info className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Foto do produto:</strong> A imagem não pode ser alterada
												após a criação do produto. Para trocar a foto, será necessário
												criar um novo produto.
											</AlertDescription>
										</Alert>
									</CardContent>
								</Card>
							</div>

							{/* Conteúdo Principal */}
							<div className="space-y-6 xl:col-span-3">
								{/* Informações Básicas */}
								<Card>
									<CardHeader>
										<CardTitle>Editar Informações do Produto</CardTitle>
										<CardDescription>Atualize os dados do seu produto</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nome do produto</FormLabel>
													<FormControl>
														<Input
															placeholder="Ex: Camiseta Vintage Azul"
															className="text-lg"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Descrição</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Descreva o produto, seu estado, marca, detalhes importantes..."
															className="min-h-[120px] resize-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="flex items-start justify-start gap-4">
											<FormField
												control={form.control}
												name="price"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Preço (R$)</FormLabel>
														<FormControl>
															<Input
																type="text"
																inputMode="decimal"
																placeholder="0,00"
																className="text-lg font-semibold"
																value={priceInput}
																onChange={handlePriceChange}
																onBlur={field.onBlur}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="category"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Categoria</FormLabel>
														<Select onValueChange={field.onChange} value={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Categoria" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{AVAILABLE_CATEGORIES.map((category) => (
																	<SelectItem key={category.value} value={category.value}>
																		{category.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="size"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Tamanho</FormLabel>
														<Select onValueChange={field.onChange} value={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Tamanho" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{AVAILABLE_SIZES.map((size) => (
																	<SelectItem key={size.value} value={size.value}>
																		{size.label}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>

								{/* Foto do Produto - Apenas Visualização */}
								<Card>
									<CardHeader className="text-center">
										<CardTitle className="flex items-center justify-center gap-2">
											<Package className="h-5 w-5" />
											Foto do Produto
										</CardTitle>
										<CardDescription>
											Imagem atual do produto (não pode ser alterada)
										</CardDescription>
									</CardHeader>
									<CardContent className="flex justify-center">
										<div className="relative">
											<Image
												src={product.image || '/placeholder.svg?height=320&width=320'}
												alt={product.name || 'Produto'}
												width={320}
												height={320}
												className="aspect-square w-80 rounded-xl border-2 object-cover opacity-90 shadow-lg"
											/>
											<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/10">
												<div className="bg-background/90 rounded-lg px-3 py-2 backdrop-blur-sm">
													<p className="text-muted-foreground text-sm font-medium">
														Imagem não editável
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Botão de Submit */}
								<div className="flex justify-center pt-4">
									<Button
										type="submit"
										size="lg"
										className="w-full max-w-md"
										disabled={!form.formState.isValid || loading}
									>
										{loading ? 'Salvando...' : 'Salvar Alterações'}
									</Button>
								</div>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
