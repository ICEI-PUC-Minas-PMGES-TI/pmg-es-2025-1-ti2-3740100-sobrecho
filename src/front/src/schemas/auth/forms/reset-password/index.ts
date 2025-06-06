import { z } from 'zod';

export const resetPasswordFormSchema = z
	.object({
		password: z.string(),
		passwordConfirm: z.string()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'As senhas precisam ser iguais',
		path: ['passwordConfirm']
	});
