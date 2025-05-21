'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

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
import { AuthCreators } from '@/redux/reducers';
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
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const router = useRouter();

	const {
		resetPassword: { loading }
	} = useTypedSelector((state) => state.auth);
	const [token, setToken] = useState<string>('');

	useEffect(() => {
		const urlToken = searchParams.get('token');

		if (!urlToken) {
			router.replace('/forgot-password');
		} else {
			setToken(urlToken);
		}
	}, [searchParams, router]);

	function onSubmit({ password, passwordConfirm }: ResetPasswordFormType) {
		dispatch(AuthCreators.postAuthResetPasswordRequest(token, password, passwordConfirm));
	}

	return (
		<AuthFormLayout
			title="Esqueceu sua senha?"
			description="Digite sua nova senha nos campos abaixo."
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
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? (
								<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
							) : (
								'Alterar senha'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</AuthFormLayout>
	);
}
