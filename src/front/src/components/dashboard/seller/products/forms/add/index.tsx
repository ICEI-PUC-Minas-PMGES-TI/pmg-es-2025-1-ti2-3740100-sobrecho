'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Upload,
	X,
	Package,
	Tag,
	TrendingUp,
	Users,
	Info,
	Lightbulb,
	CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

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
import { addProductFormSchema } from '@/schemas/dashboard/seller/products/forms';

import type { AddProductFormType } from '@/types/dashboard/seller/products/forms';
import type React from 'react';

export function AddProductForm() {
	const form = useForm<AddProductFormType>({
		resolver: zodResolver(addProductFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			description: '',
			price: undefined,
			category: '',
			size: '',
			image: undefined
		}
	});

	const {
		create: { loading, success }
	} = useTypedSelector((state) => state.products);
	const dispatch = useDispatch();
	const router = useRouter();

	function onSubmit(data: AddProductFormType) {
		const payload = {
			...data,
			image: data.image as File
		};

		dispatch(ProductsCreators.productsCreateRequest(payload));
	}

	useEffect(() => {
		if (success) {
			router.push('/dashboard/products');
		}
	}, [router, success]);

	const [imagePreview, setImagePreview] = useState<string>('');
	const [priceInput, setPriceInput] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) return;

		if (!file.type.startsWith('image/')) {
			toast.error('O arquivo selecionado precisa ser uma imagem.');
			return;
		}

		form.setValue('image', file, { shouldValidate: true });
		setImagePreview(URL.createObjectURL(file));

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	function handleFileRemove() {
		const image = form.getValues('image');
		if (image) {
			URL.revokeObjectURL(imagePreview);
		}
		form.setValue('image', undefined, { shouldValidate: true });
		setImagePreview('');
	}

	// Watch form values for preview
	const watchedValues = form.watch();

	// Calculate form completion
	const formFields = ['name', 'description', 'price', 'category', 'size', 'image'];
	const completedFields = formFields.filter((field) => {
		const value = watchedValues[field as keyof typeof watchedValues];
		return value !== undefined && value !== '' && value !== null;
	}).length;
	const completionPercentage = (completedFields / formFields.length) * 100;

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
															{field === 'image' && 'Foto'}
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
											Dicas
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<Alert>
											<Info className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Foto de qualidade:</strong> Use imagens com boa iluminação
												e fundo neutro para destacar o produto.
												<span>Lembre-se: A foto não pode ser alterada depois.</span>
											</AlertDescription>
										</Alert>

										<Alert>
											<Users className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Descrição detalhada:</strong> Inclua informações sobre
												material, estado de conservação e medidas.
											</AlertDescription>
										</Alert>

										<Alert>
											<Tag className="h-4 w-4" />
											<AlertDescription className="text-sm">
												<strong>Preço competitivo:</strong> Pesquise produtos similares
												para definir um preço atrativo.
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
										<CardTitle>Informações Básicas</CardTitle>
										<CardDescription>Dados essenciais do seu produto</CardDescription>
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
																onChange={(e) => {
																	const raw = e.target.value;

																	// Atualiza o texto visível (permite vírgula)
																	setPriceInput(raw);

																	// Normaliza para ponto e converte para número
																	const normalized = raw.replace(',', '.');

																	// Só envia para o form se for um número válido
																	const parsed = parseFloat(normalized);
																	if (!isNaN(parsed)) {
																		field.onChange(parsed);
																	} else {
																		field.onChange(undefined);
																	}
																}}
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

								{/* Foto do Produto */}
								<Card>
									<CardHeader className="text-center">
										<CardTitle className="flex items-center justify-center gap-2">
											<Package className="h-5 w-5" />
											Foto do Produto
										</CardTitle>
										<CardDescription>
											Adicione uma foto que represente bem o seu produto
										</CardDescription>
									</CardHeader>
									<CardContent className="flex justify-center">
										<FormField
											control={form.control}
											name="image"
											render={() => (
												<FormItem>
													<FormControl>
														<div className="space-y-4">
															<input
																ref={fileInputRef}
																type="file"
																accept="image/*"
																onChange={handleFileSelect}
																className="hidden"
																id="image-upload"
															/>

															{!imagePreview ? (
																<label
																	htmlFor="image-upload"
																	className="border-muted-foreground/25 bg-foreground/5 hover:bg-muted/50 hover:border-muted-foreground/50 flex h-80 w-80 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all"
																>
																	<div className="flex flex-col items-center gap-4">
																		<Upload className="text-muted-foreground h-12 w-12" />
																		<div className="text-center">
																			<span className="text-lg font-medium">
																				Clique para adicionar uma foto
																			</span>
																			<p className="text-muted-foreground mt-1 text-sm">
																				PNG, JPG, JPEG até 10MB
																			</p>
																		</div>
																	</div>
																</label>
															) : (
																<div className="relative">
																	<Image
																		src={imagePreview || '/placeholder.svg'}
																		alt="Preview do produto"
																		width={320}
																		height={320}
																		className="aspect-square w-80 rounded-xl border-2 object-cover shadow-lg"
																	/>
																	<Button
																		type="button"
																		variant="default"
																		size="icon"
																		className="bg-destructive hover:bg-destructive/90 absolute top-3 right-3 size-7 cursor-pointer shadow-lg"
																		onClick={handleFileRemove}
																	>
																		<X className="h-5 w-5" />
																	</Button>
																</div>
															)}
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
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
										{loading ? 'Publicando...' : 'Publicar Produto'}
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
