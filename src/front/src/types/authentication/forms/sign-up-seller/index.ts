import z from 'zod';

import { signUpSellerFormSchema } from '@/schemas/authentication/forms';

export type SignUpSellerFormType = z.infer<typeof signUpSellerFormSchema>;
