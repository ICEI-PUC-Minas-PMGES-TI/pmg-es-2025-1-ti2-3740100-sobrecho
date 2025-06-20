import { z } from 'zod';

export const editProductFormSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório.'),
	description: z.string().min(1, 'Descrição é obrigatório.'),
	category: z.string().min(1, 'Categoria é obrigatório.'),
	price: z.number().positive('Preço deve ser maior que zero.'),
	size: z.string().min(1, 'Selecione um tamanho.')
});
