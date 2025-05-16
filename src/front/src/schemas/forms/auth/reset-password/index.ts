import { z } from 'zod';

export const resetPasswordFormSchema = z.object({
	password: z.string().nonempty('A senha é obrigatória.'),
	passwordConfirm: z.string().nonempty('A confirmação de senha é obrigatória.')
});
