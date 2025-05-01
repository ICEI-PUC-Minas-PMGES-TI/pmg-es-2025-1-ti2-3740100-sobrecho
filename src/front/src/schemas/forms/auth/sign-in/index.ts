import { z } from 'zod';

export const signInFormSchema = z.object({
	email: z
		.string()
		.email('Por favor, insira um e-mail válido.')
		.nonempty('O e-mail é obrigatório.'),
	password: z.string().nonempty('A senha é obrigatória.')
});
