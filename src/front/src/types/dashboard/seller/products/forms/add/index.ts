import { z } from 'zod';

import { addProductFormSchema } from '@/schemas/dashboard/seller/products/forms';

export type AddProductFormType = z.infer<typeof addProductFormSchema>;
