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
import { resetPasswordFormSchema } from '@/schemas/forms/auth';
import { ResetPasswordFormType } from '@/types/forms/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

export function ResetPasswordForm() {
	const form = useForm<ResetPasswordFormType>({
		resolver: zodResolver(resetPasswordFormSchema),
		mode: 'onChange',
		defaultValues: {
			password: '',
			passwordConfirm: ''
		}
	});
	// const dispatch = useDispatch();

	const { loading } = useTypedSelector((state) => state.auth);

	function onSubmit({ password, passwordConfirm }: ResetPasswordFormType) {
		// dispatch(AuthCreators.postAuthResetPassword(password, passwordConfirm));
		console.log(password, passwordConfirm);
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="passwordConfirm"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirmar senha</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={!form.formState.isValid}>
							{loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
							Alterar senha
						</Button>
					</div>
				</form>
			</Form>
		</AuthFormLayout>
	);
}
