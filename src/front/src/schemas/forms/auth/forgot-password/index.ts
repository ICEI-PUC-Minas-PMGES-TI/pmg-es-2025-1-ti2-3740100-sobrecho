import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
	email: z
		.string()
		.email('Por favor, insira um e-mail válido.')
		.nonempty('O e-mail é obrigatório.')
});
