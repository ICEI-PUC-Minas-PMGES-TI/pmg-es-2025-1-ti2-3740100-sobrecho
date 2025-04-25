'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { AuthFormLayout } from '@/components/layouts/forms';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui';

import { signUpFormSchema } from '@/schemas/forms/auth';
import { SignUpFormType } from '@/types/forms/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm() {
	const form = useForm<SignUpFormType>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	function onSubmit(values: SignUpFormType) {
		console.log(values);
	}

	return (
		<AuthFormLayout
			title="Criar conta"
			description="Digite suas credenciais para criar uma conta."
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
										<FormMessage />
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
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full">
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