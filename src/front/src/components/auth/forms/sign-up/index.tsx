'use client';

import Link from 'next/link';
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
import { signUpFormSchema } from '@/schemas/auth/forms';
import { SignUpFormType } from '@/types/auth/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { mask, unmask } from 'remask';

export function SignUpForm() {
	const form = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			birthdate: '',
			password: ''
		}
	});

	const {
		signUp: { loading }
	} = useTypedSelector((state) => state.auth);

	const dispatch = useDispatch();

	function onSubmit(data: SignUpFormType) {
		dispatch(AuthCreators.postAuthSignUpRequest(data));
	}

	return (
		<>
			<AuthLayout
				title="Criar conta"
				description="Digite seus dados para criar uma conta."
			>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="João Silva Santos" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input placeholder="joao@email.com" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="(99) 99999-9999"
												value={mask(field.value, ['(99) 99999-9999'])}
												onChange={(e) => field.onChange(unmask(e.target.value))}
												type="tel"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="birthdate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Data de nascimento</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="DD/MM/AAAA"
												value={mask(field.value, ['99/99/9999'])}
												onChange={(e) => field.onChange(unmask(e.target.value))}
												type="tel"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
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
						<Button
							type="submit"
							className="w-full"
							disabled={!form.formState.isValid || loading}
						>
							{loading ? <Loader2Icon className="animate-spin" /> : 'Criar conta'}
						</Button>
					</form>
				</Form>
			</AuthLayout>
			<div className="text-center text-sm">
				Já tem uma conta?{' '}
				<Link
					href="/sign-in"
					className="text-primary hover:underline hover:underline-offset-4"
				>
					Entrar
				</Link>
			</div>
		</>
	);
}
