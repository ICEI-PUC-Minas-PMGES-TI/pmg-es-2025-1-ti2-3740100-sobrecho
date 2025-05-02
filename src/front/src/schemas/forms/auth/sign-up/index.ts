import { z } from 'zod';

export const signUpFormSchema = z.object({
	name: z.string().nonempty('O nome é obrigatório.'),
	email: z
		.string()
		.email('Por favor, insira um e-mail válido.')
		.nonempty('O e-mail é obrigatório.'),
	password: z.string().nonempty('A senha é obrigatória.')
});
