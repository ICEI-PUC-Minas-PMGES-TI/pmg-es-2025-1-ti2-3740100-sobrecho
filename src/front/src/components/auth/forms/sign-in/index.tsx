'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { AuthLayout } from '@/components/auth/layout';
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
import { signInFormSchema } from '@/schemas/auth/forms';
import { SignInFormType } from '@/types/auth/forms';
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

	const {
		signed,
		signIn: { loading }
	} = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();
	const router = useRouter();

	function onSubmit(data: SignInFormType) {
		dispatch(AuthCreators.postAuthSignInRequest(data));
	}

	useEffect(() => {
		if (signed) router.push('/');
	}, [signed, router]);

	return (
		<>
			<AuthLayout
				title="Entrar na conta"
				description="Digite suas credenciais para entrar na sua conta."
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="exemplo@email.com" type="email" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center justify-between">
										<FormLabel>Senha</FormLabel>
										<Link
											href="/forgot-password"
											className="text-sm text-primary hover:underline hover:underline-offset-4"
										>
											Esqueceu sua senha?
										</Link>
									</div>
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
							{loading ? <Loader2Icon className="animate-spin" /> : 'Entrar'}
						</Button>
					</form>
				</Form>
			</AuthLayout>
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
