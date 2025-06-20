import { z } from 'zod';

export const signInFormSchema = z.object({
	email: z.string().email('E-mail inválido.'),
	password: z.string()
});
