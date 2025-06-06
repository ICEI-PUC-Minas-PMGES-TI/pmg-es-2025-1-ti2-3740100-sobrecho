import z from 'zod';

export const addProductSchema = z.object({
	name: z.string().min(3).max(100),
	category: z.string().min(1),
	price: z.number().min(0.01),
	description: z.string().min(10).max(500),
	size: z.array(z.string()).min(1),
	images: z.array(z.string()).min(1).max(8)
});
