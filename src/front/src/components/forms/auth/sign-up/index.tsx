'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
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
import { signUpFormSchema } from '@/schemas/forms/auth';
import { SignUpFormType } from '@/types/forms/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';

export function SignUpForm() {
	const form = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	});

	const { loading, signed } = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (signed) {
			redirect('/');
		}
	}, [signed]);

	function onSubmit({ name, email, password }: SignUpFormType) {
		dispatch(AuthCreators.postAuthRegisterRequest(name, email, password));
	}

	return (
		<AuthFormLayout
			title="Criar conta"
			description="Digite suas credenciais para criar uma conta."
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Nome</FormLabel>
										<FormControl>
											<Input type="text" required {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Email</FormLabel>
										<FormControl>
											<Input type="email" required {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="mb-2 grid gap-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Senha</FormLabel>
										<FormControl>
											<Input type="password" required {...field} />
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
							{loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
							Criar conta
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Já tem uma conta?{' '}
						<Link href="/sign-in" className="underline underline-offset-4">
							Entrar
						</Link>
					</div>
				</form>
			</Form>
		</AuthFormLayout>
	);
}
