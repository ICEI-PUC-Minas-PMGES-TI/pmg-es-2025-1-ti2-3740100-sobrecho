import { z } from 'zod';

export const signUpSellerFormSchema = z.object({
	name: z.string(),
	email: z.string().email('Digite um e-mail válido.'),
	password: z
		.string()
		.min(8, 'A senha deve ter no mínimo 8 caracteres.')
		.regex(/(?=.*\d)/, 'A senha deve conter pelo menos um número.')
		.regex(/(?=.*[a-z])/, 'A senha deve conter pelo menos uma letra minúscula.')
		.regex(/(?=.*[A-Z])/, 'A senha deve conter pelo menos uma letra maiúscula.'),
	birthdate: z
		.string()
		.regex(/^\d{8}$/, 'Data inválida')
		.transform((val) => {
			const day = val.slice(0, 2);
			const month = val.slice(2, 4);
			const year = val.slice(4, 8);
			return `${year}-${month}-${day}`;
		}),
	phone: z.string(),
	document: z.string(),
	store: z.object({
		name: z.string(),
		description: z.string(),
		image: z.instanceof(File, {
			message: 'Imagem inválida'
		})
	})
});
