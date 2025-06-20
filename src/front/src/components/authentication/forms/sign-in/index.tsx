'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { AuthenticationLayout } from '@/components/authentication/layout';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { AuthCreators } from '@/redux/reducers';
import { signInFormSchema } from '@/schemas/authentication';
import { SignInFormType } from '@/types/authentication';

export function SignInForm() {
	const form = useForm<SignInFormType>({
		resolver: zodResolver(signInFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const { loading } = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();

	function onSubmit(data: SignInFormType) {
		dispatch(AuthCreators.authSignInRequest(data));
	}

	return (
		<>
			<AuthenticationLayout
				title="Entrar"
				description="Digite suas credenciais para entrar na sua conta."
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<div className="flex h-4 items-center justify-between">
										<FormLabel>E-mail</FormLabel>
										<FormMessage />
									</div>
									<FormControl>
										<Input type="email" placeholder="exemplo@email.com" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="data-[error=true]:text-foreground">
										Senha
									</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? <Loader2Icon className="size-4 animate-spin" /> : 'Entrar'}
						</Button>
					</form>
				</Form>
			</AuthenticationLayout>
			<div className="text-center text-sm">
				Não tem uma conta?{' '}
				<Link
					href="/sign-up"
					className="text-primary hover:underline hover:underline-offset-4"
				>
					Criar conta
				</Link>
			</div>
		</>
	);
}
