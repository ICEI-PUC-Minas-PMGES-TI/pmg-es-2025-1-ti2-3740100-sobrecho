'use client';

import { useForm } from 'react-hook-form';

import { AuthFormLayout } from '@/components/layouts/forms';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input
} from '@/components/ui';

import { useTypedSelector } from '@/hooks';
import { forgotPasswordFormSchema } from '@/schemas/forms/auth';
import { ForgotPasswordFormType } from '@/types/forms/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

export function ForgotPasswordForm() {
	const form = useForm<ForgotPasswordFormType>({
		resolver: zodResolver(forgotPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: ''
		}
	});
	// const dispatch = useDispatch();

	const { loading } = useTypedSelector((state) => state.auth);

	function onSubmit({ email }: ForgotPasswordFormType) {
		// dispatch(AuthCreators.postAuthForgotPasswordRequest(email));
		console.log(email);
	}

	return (
		<AuthFormLayout
			title="Esqueceu sua senha?"
			description="Digite seu e-mail para recuperar sua senha."
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="email@exemplo.com" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={!form.formState.isValid}>
							{loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
							Enviar e-mail
						</Button>
					</div>
				</form>
			</Form>
		</AuthFormLayout>
	);
}
