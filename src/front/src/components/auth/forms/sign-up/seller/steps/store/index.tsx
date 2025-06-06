import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Textarea
} from '@/components/ui';

import { Camera, Upload } from 'lucide-react';
import { mask, unmask } from 'remask';

export function StoreStep() {
	const { control, watch } = useFormContext();

	const [imagePreview, setImagePreview] = useState<string>('');

	const file = watch('store.image');

	useEffect(() => {
		if (!file) {
			setImagePreview('');
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			setImagePreview(e.target?.result as string);
		};
		reader.readAsDataURL(file);

		return () => {
			setImagePreview('');
		};
	}, [file]);

	return (
		<>
			<FormField
				control={control}
				name="document"
				render={({ field }) => (
					<FormItem>
						<FormLabel>CPF/CNPJ</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder="999.999.999-99"
								value={mask(field.value, ['999.999.999-99', '99.999.999/9999-99'])}
								onChange={(e) => field.onChange(unmask(e.target.value))}
								type="tel"
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="store.name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Nome da Loja</FormLabel>
						<FormControl>
							<Input type="text" placeholder="Minha loja" {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="store.description"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Descrição da Loja</FormLabel>
						<FormControl>
							<Textarea
								placeholder="Descreva sua loja, produtos e diferenciais..."
								className="min-h-[100px] resize-none bg-foreground/5"
								{...field}
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="store.image"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Foto da Loja</FormLabel>
						<FormDescription>
							Selecione uma imagem para representar sua loja
						</FormDescription>
						<FormControl>
							<div className="flex items-center gap-3">
								<Input
									id="store-image"
									type="file"
									accept="image/*"
									onChange={(e) => {
										const selectedFile = e.target.files?.[0];
										field.onChange(selectedFile);
									}}
									className="hidden"
								/>
								<label
									htmlFor="store-image"
									className="flex h-8 flex-1 cursor-pointer items-center gap-2 rounded-md border border-input bg-foreground/5 px-2.5 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Upload className="h-3.5 w-3.5" />
									<span className="truncate text-sm">
										{field.value ? field.value.name : 'Escolher imagem'}
									</span>
								</label>

								<Avatar className="h-10 w-10">
									<AvatarImage src={imagePreview || undefined} />
									<AvatarFallback className="bg-muted">
										<Camera className="h-4 w-4 text-muted-foreground" />
									</AvatarFallback>
								</Avatar>
							</div>
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	);
}
