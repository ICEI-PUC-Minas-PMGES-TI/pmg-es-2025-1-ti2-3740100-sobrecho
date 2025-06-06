'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
	Form,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	FormMessage,
	Textarea,
	Button,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Checkbox,
	Label
} from '@/components/ui';

import { useTypedSelector } from '@/hooks';
import { ProductsCreators } from '@/redux/reducers';
import type { IProduct } from '@/redux/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X, Loader2 } from 'lucide-react';
import { z } from 'zod';

// Schema atualizado para ser mais flexível com imagens
const editProductSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	category: z.string().min(1, 'Categoria é obrigatória'),
	price: z
		.string()
		.min(1, 'Preço é obrigatório')
		.refine((val) => {
			// Remove vírgulas e converte para número
			const cleanValue = val.replace(',', '.');
			const parsedValue = Number.parseFloat(cleanValue);
			return !isNaN(parsedValue) && parsedValue > 0;
		}, 'Preço deve ser um número maior que zero'),
	quantity: z.string().min(1, 'Quantidade deve ser pelo menos 1'),
	description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
	size: z.array(z.string()).min(1, 'Selecione pelo menos um tamanho'),
	images: z
		.array(z.any())
		.min(1, 'Adicione pelo menos uma imagem')
		.max(8, 'Máximo 8 imagens')
});

type EditProductFormType = z.infer<typeof editProductSchema>;

interface IEditProductFormProps {
	product: IProduct;
}

export function EditProductForm({ product }: IEditProductFormProps) {
	const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
	const [imageFiles, setImageFiles] = useState<(File | string)[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	const form = useForm<EditProductFormType>({
		resolver: zodResolver(editProductSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			category: '',
			price: '',
			description: '',
			quantity: '',
			size: [],
			images: []
		}
	});

	// Inicializar o formulário com os dados do produto
	useEffect(() => {
		if (product && !isInitialized) {
			// Configurar valores iniciais
			form.reset({
				name: product.name || '',
				category: product.category || '',
				price: product.price || '',
				quantity: product.quantity || '',
				description: product.description || '',
				size: product.size || [],
				images: product.images || []
			});

			// Configurar imagens
			if (product.images && product.images.length > 0) {
				setImageFiles(product.images);
				setImagePreviewUrls(product.images);
			}

			setIsInitialized(true);
		}
	}, [product, form, isInitialized]);

	const {
		updateProduct: { loading }
	} = useTypedSelector((state) => state.products);
	const dispatch = useDispatch();
	const router = useRouter();

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const newFiles = Array.from(files);

		// Verificar se não excede o limite de 8 imagens
		if (imageFiles.length + newFiles.length > 8) {
			alert('Máximo de 8 imagens permitidas');
			return;
		}

		// Verificar se são arquivos de imagem
		const validFiles = newFiles.filter((file) => file.type.startsWith('image/'));
		if (validFiles.length !== newFiles.length) {
			alert('Apenas arquivos de imagem são permitidos');
		}

		// Atualizar arrays de arquivos e previews
		const updatedFiles = [...imageFiles, ...validFiles];
		const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
		const updatedPreviews = [...imagePreviewUrls, ...newPreviewUrls];

		setImageFiles(updatedFiles);
		setImagePreviewUrls(updatedPreviews);

		// Atualizar o formulário
		form.setValue('images', updatedFiles, { shouldValidate: true });

		// Limpar o input
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const removeImage = (index: number) => {
		const newFiles = imageFiles.filter((_, i) => i !== index);
		const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);

		// Revogar URL se for um blob criado localmente
		const urlToRevoke = imagePreviewUrls[index];
		if (urlToRevoke && urlToRevoke.startsWith('blob:')) {
			URL.revokeObjectURL(urlToRevoke);
		}

		setImageFiles(newFiles);
		setImagePreviewUrls(newPreviews);
		form.setValue('images', newFiles, { shouldValidate: true });
	};

	function onSubmit(data: EditProductFormType) {
		const processedPrice = data.price.replace(',', '.');

		const payload = {
			...product,
			...data,
			price: processedPrice,
			images: imageFiles
		};

		dispatch(ProductsCreators.productUpdateRequest(payload));

		if (loading === false) {
			router.push('/dashboard/products');
		}
	}

	const sizes = [
		{ value: 'pp', label: 'PP' },
		{ value: 'p', label: 'P' },
		{ value: 'm', label: 'M' },
		{ value: 'g', label: 'G' },
		{ value: 'gg', label: 'GG' },
		{ value: 'xgg', label: 'XGG' }
	];

	const categories = [
		{ value: 'roupas-femininas', label: 'Roupas Femininas' },
		{ value: 'roupas-masculinas', label: 'Roupas Masculinas' },
		{ value: 'acessorios', label: 'Acessórios' },
		{ value: 'calcados', label: 'Calçados' },
		{ value: 'bolsas', label: 'Bolsas' },
		{ value: 'joias', label: 'Joias' },
		{ value: 'decoracao', label: 'Decoração' },
		{ value: 'livros', label: 'Livros' }
	];

	// Não renderizar até estar inicializado
	if (!isInitialized) {
		return (
			<div className="flex items-center justify-center p-8">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Informações do Produto</CardTitle>
							<CardDescription>
								Preencha as informações básicas do produto
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome do Produto</FormLabel>
										<FormControl>
											<Input placeholder="Ex: Vestido Vintage Azul" {...field} />
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
													<SelectValue placeholder="Selecione uma categoria" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map((category) => (
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
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Preço (R$)</FormLabel>
										<FormControl>
											<Input
												type="text"
												inputMode="decimal"
												placeholder="0,00"
												{...field}
												onChange={(e) => {
													const inputValue = e.target.value;
													// Aceita apenas números e vírgula/ponto
													if (/^[0-9]*[.,]?[0-9]*$/.test(inputValue)) {
														field.onChange(inputValue);
													}
												}}
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
												className="resize-none"
												placeholder="Descreva o produto, seu estado, marca, etc."
												rows={4}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="size"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tamanhos Disponíveis</FormLabel>
										<FormControl>
											<div className="grid grid-cols-3 gap-4">
												{sizes.map((size) => (
													<div key={size.value} className="flex items-center space-x-2">
														<Checkbox
															id={size.value}
															checked={field.value?.includes(size.value)}
															onCheckedChange={(checked) => {
																const currentSizes = field.value || [];
																if (checked) {
																	field.onChange([...currentSizes, size.value]);
																} else {
																	field.onChange(
																		currentSizes.filter((s) => s !== size.value)
																	);
																}
															}}
														/>
														<Label
															htmlFor={size.value}
															className="cursor-pointer text-sm font-normal"
														>
															{size.label}
														</Label>
													</div>
												))}
											</div>
										</FormControl>
										<FormMessage />
										{field.value && field.value.length > 0 && (
											<p className="text-sm text-muted-foreground">
												Selecionados:{' '}
												{field.value
													.map((s) => sizes.find((size) => size.value === s)?.label)
													.join(', ')}
											</p>
										)}
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="quantity"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quantidade total</FormLabel>
										<FormControl>
											<Input
												{...field}
												type="text"
												inputMode="numeric"
												pattern="[0-9]*"
												value={field.value ?? ''}
												onChange={(e) => {
													const inputValue = e.target.value;

													// Aceita apenas números inteiros (0-9)
													if (/^\d*$/.test(inputValue)) {
														field.onChange(inputValue);
													}
												}}
												className="appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
			 [&::-webkit-outer-spin-button]:appearance-none"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Fotos do Produto</CardTitle>
							<CardDescription>
								Adicione até 8 fotos do produto. A primeira será a foto principal.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="images"
								render={() => (
									<FormItem>
										<FormControl>
											<div className="space-y-4">
												<div className="grid grid-cols-2 gap-4">
													{imagePreviewUrls.map((url, index) => (
														<div key={index} className="group relative">
															<Image
																src={url || '/placeholder.svg'}
																alt={`Produto ${index + 1}`}
																width={200}
																height={200}
																className="h-32 w-full rounded-lg border object-cover"
															/>
															<Button
																type="button"
																variant="destructive"
																size="icon"
																className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
																onClick={() => removeImage(index)}
															>
																<X className="h-3 w-3" />
															</Button>
															{index === 0 && (
																<div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
																	Principal
																</div>
															)}
														</div>
													))}

													{imagePreviewUrls.length < 8 && (
														<div>
															<input
																ref={fileInputRef}
																type="file"
																accept="image/*"
																multiple
																onChange={handleFileSelect}
																className="hidden"
																id="image-upload"
															/>
															<Label
																htmlFor="image-upload"
																className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 bg-foreground/5 transition-colors hover:bg-muted/50"
															>
																<div className="flex flex-col items-center gap-2">
																	<Upload className="h-6 w-6" />
																	<span className="text-sm">Adicionar Foto</span>
																</div>
															</Label>
														</div>
													)}
												</div>

												{imagePreviewUrls.length > 0 && (
													<p className="text-sm text-muted-foreground">
														{imagePreviewUrls.length} de 8 imagens adicionadas
													</p>
												)}
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<div className="flex gap-4">
						<Button
							type="submit"
							className="flex-1"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Salvando...
								</>
							) : (
								'Salvar alterações'
							)}
						</Button>
					</div>

					{/* Debug: Mostrar estado do formulário em desenvolvimento */}
					{process.env.NODE_ENV === 'development' && (
						<Card>
							<CardHeader>
								<CardTitle className="text-sm">Debug - Estado do Formulário</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-1 text-xs">
									<p>Valid: {form.formState.isValid ? '✅' : '❌'}</p>
									<p>Dirty: {form.formState.isDirty ? '✅' : '❌'}</p>
									<p>Errors: {Object.keys(form.formState.errors).length}</p>
									<p>Images: {imageFiles.length}</p>
									<p>Form Images: {form.watch('images')?.length || 0}</p>
									{Object.keys(form.formState.errors).length > 0 && (
										<pre className="rounded bg-muted p-2 text-xs">
											{JSON.stringify(form.formState.errors, null, 2)}
										</pre>
									)}
									<div className="mt-2">
										<p className="font-semibold">Valores atuais:</p>
										<pre className="rounded bg-muted p-2 text-xs">
											{JSON.stringify(form.watch(), null, 2)}
										</pre>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</form>
		</Form>
	);
}
