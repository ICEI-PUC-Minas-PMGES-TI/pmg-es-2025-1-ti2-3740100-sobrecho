'use client';

import Link from 'next/link';
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
import { AuthCreators } from '@/redux/reducers/auth';
import { signInFormSchema } from '@/schemas/forms/auth';
import { SignInFormType } from '@/types/forms/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

export function SignInForm() {
	const form = useForm<SignInFormType>({
		resolver: zodResolver(signInFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});
	const dispatch = useDispatch();

	const { loading } = useTypedSelector((state) => state.auth);

	function onSubmit({ email, password }: SignInFormType) {
		dispatch(AuthCreators.postAuthLoginRequest(email, password));
	}

	return (
		<AuthFormLayout
			title="Entre na sua conta"
			description="Digite suas credenciais para acessar sua conta."
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
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center">
											Senha
											<Link
												href="/forgot-password"
												className="ml-auto inline-block text-sm font-normal underline-offset-4 hover:underline"
											>
												Esqueceu sua senha?
											</Link>
										</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={!form.formState.isValid}>
							{loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
							Entrar
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Não tem uma conta?{' '}
						<Link href="/sign-up" className="underline underline-offset-4">
							Cadastre-se
						</Link>
					</div>
				</form>
			</Form>
		</AuthFormLayout>
	);
}
