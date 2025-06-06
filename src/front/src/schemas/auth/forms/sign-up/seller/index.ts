import { z } from 'zod';

export const sellerSignUpFormSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
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
		image: z
			.instanceof(File, {
				message: 'Imagem inválida'
			})
			.optional()
	})
});
