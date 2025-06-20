import { z } from 'zod';

import { editProductFormSchema } from '@/schemas/dashboard/seller/products/forms';

export type EditProductFormType = z.infer<typeof editProductFormSchema>;
